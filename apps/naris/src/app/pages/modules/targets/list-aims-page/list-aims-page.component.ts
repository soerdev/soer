import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusEmitter, MixedBusService } from '@soer/mixed-bus';
import { AimModel } from '@soer/soer-components';
import { CommandUpdate, DataStoreService, DtoPack, OK } from '@soer/sr-dto';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { filter, first, Observable } from 'rxjs';
import { convertToJsonDTO, parseJsonDTOPack } from '../../../../api/json.dto.helpers';
import { TargetModel, Visibility } from '../../../../api/targets/target.interface';
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
      private route: ActivatedRoute,
      private router: Router

  ) { 
    this.targetsId = this.route.snapshot.data['targets'];
    this.targets$ = parseJsonDTOPack<TargetModel>(this.store$.of(this.targetsId), 'Targets'); 
    this.isSingleMode = this.route.snapshot.params['tid'] !== undefined;
  }

  ngOnInit() {
    this.createTasksVisibility()
  }

  onUpdate(target: TargetModel): void {
    const tmpTargetId = {...this.targetId, key: {tid: target.id}};
    this.bus$.publish(
      new CommandUpdate(
        tmpTargetId,
        { ...convertToJsonDTO(target, ['id']), id: target.id },
        {skipRoute: true, skipSyncRead: true}
      )
    );
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

  onEdit(target: AimModel): void {
    this.router.navigate(['/pages/targets', {outlets: {popup: ['target', 'edit', target.id]}}]);
  }
}
