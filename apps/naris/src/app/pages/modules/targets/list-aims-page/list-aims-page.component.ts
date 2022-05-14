import { ChangeDetectionStrategy, Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusEmitter, MixedBusService } from '@soer/mixed-bus';
import { CommandUpdate, DataStoreService, DtoPack, OK } from '@soer/sr-dto';
import { NzNotificationComponent, NzNotificationDataOptions, NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { convertToJsonDTO, parseJsonDTOPack } from '../../../../api/json.dto.helpers';
import { TargetModel, Visibility } from '../../../../api/targets/target.interface';
import { propagateProgress, updateProgress } from '../progress.helper';
import { DONE_PROGRESS, UNDONE_PROGRESS } from '../targets.const';



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

  private targetsId: BusEmitter;

  constructor(
      @Inject('target') private targetId: BusEmitter,
      private bus$: MixedBusService,
      private store$: DataStoreService,
      private notification: NzNotificationService,
      private route: ActivatedRoute
  ) { 
    this.targetsId = this.route.snapshot.data['targets'];
    this.targets$ = parseJsonDTOPack<TargetModel>(this.store$.of(this.targetsId), 'Targets'); }

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
        {skipRoute: true}
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
    this.targets$.subscribe(
      (target => {
        if (target.status === OK) {
          const visibility = target.items.reduce((acc: Visibility, curr: TargetModel) => {
            acc[curr.id || 0] = false
            return acc
          }, {})

          this.visibility = visibility
        }
    }))
  }

  toggleTaskVisibility(taskId: TargetModel['id']): void {
    if (taskId) {
      this.visibility[taskId] = !this.visibility[taskId] 
    }
  }
}
