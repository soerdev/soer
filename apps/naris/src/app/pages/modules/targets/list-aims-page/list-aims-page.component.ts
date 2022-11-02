import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusEmitter, MixedBusService } from '@soer/mixed-bus';
import { CommandUpdate, DataStoreService, DtoPack, OK } from '@soer/sr-dto';
import { NzNotificationComponent, NzNotificationDataOptions, NzNotificationService } from 'ng-zorro-antd/notification';
import { filter, first, Observable } from 'rxjs';
import { AimModel } from '@soer/soer-components';
import { convertToJsonDTO, parseJsonDTOPack } from '../../../../api/json.dto.helpers';
import { TargetModel, Visibility } from '../../../../api/targets/target.interface';
import { propagateProgress, updateProgress } from '../progress.helper';
import { DONE_PROGRESS, TargetKey, UNDONE_PROGRESS } from '../targets.const';



@Component({
  selector: 'soer-list-aims-page',
  templateUrl: './list-aims-page.component.html',
  styleUrls: ['./list-aims-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListAimsPageComponent implements OnInit {

  checked = false;
  public targets$: Observable<DtoPack<TargetModel>>;
  public visibility: Visibility = {};

  public readonly doneProgress = DONE_PROGRESS;
  public readonly undoneProgress = UNDONE_PROGRESS;
  public readonly gradientColors = { '0%': '#ff0000', '50%': '#ff0000', '75%': '#ff9900', '100%': '#0f0' };
  public expanderCache: Visibility = {};
  public isSingleMode: boolean;

  private targetsId: BusEmitter<TargetKey>;

  constructor(
      @Inject('target') private targetId: BusEmitter,
      private bus$: MixedBusService,
      private store$: DataStoreService,
      private notification: NzNotificationService,
      private route: ActivatedRoute
  ) { 
    this.targetsId = this.route.snapshot.data['targets'];
    this.targets$ = parseJsonDTOPack<TargetModel>(this.store$.of(this.targetsId), 'Targets'); 
    this.isSingleMode = this.route.snapshot.params['tid'] !== undefined;
  }

  ngOnInit() {
    this.createTasksVisibility()
  }

   // eslint-disable-next-line @typescript-eslint/ban-types
  check(task: TargetModel, target: TargetModel, progress: number = DONE_PROGRESS, template: TemplateRef<{}> | null = null): void {
    propagateProgress(task, progress);
    updateProgress(target);
    const tmpTargetId = {...this.targetId, key: {tid: target.id}};
    this.bus$.publish(
      new CommandUpdate(
        tmpTargetId,
        { ...convertToJsonDTO(target, ['id']), id: target.id },
        {skipRoute: true, skipSyncRead: true}
      )
    );

    if (template) {
      this.notification.template(template, {nzData: {task, target}, nzPlacement: 'bottomRight'});
    }
  }

  undo(notify: NzNotificationComponent): void {
      const target = (notify.instance.options as NzNotificationDataOptions<{target: TargetModel}>).nzData?.target;
      const task = (notify.instance.options as NzNotificationDataOptions<{task: TargetModel}>).nzData?.task;
      if (task && target) {
        this.check(task, target, UNDONE_PROGRESS);
      }
      notify.close();
  }

  createTasksVisibility(): void {
    this.targets$.pipe(filter(target => target.status === OK), first()).subscribe(
      (target => {
        const visibility = target.items.reduce((acc: Visibility, curr: TargetModel) => {
          acc[curr.id || 0] = this.isSingleMode;
          return acc
        }, {})

        this.visibility = visibility;
    }))
  }

  toggleTaskVisibility(taskId: TargetModel['id']): void {
    if (taskId) {
      this.visibility[taskId] = !this.visibility[taskId] 
    }
  }
}
