import { ChangeDetectionStrategy, Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { NzNotificationComponent, NzNotificationData, NzNotificationDataOptions, NzNotificationRef, NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { convertToJsonDTO, parseJsonDTOPack } from 'src/app/api/json.dto.helpers';
import { RoadmapTask, TargetModel } from 'src/app/api/targets/target.interface';
import { CommandUpdate } from 'src/app/packages/dto/bus-messages/bus.messages';
import { DtoPack } from 'src/app/packages/dto/interfaces/dto.pack.interface';
import { DataStoreService } from 'src/app/packages/dto/services/data-store.service';
import { BusOwner } from 'src/app/packages/mixed-bus/interfaces/mixed-bus.interface';
import { MixedBusService } from 'src/app/packages/mixed-bus/mixed-bus.service';
import { DONE_PROGRESS, UNDONE_PROGRESS } from '../targets.const';



@Component({
  selector: 'app-list-aims-page',
  templateUrl: './list-aims-page.component.html',
  styleUrls: ['./list-aims-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListAimsPageComponent implements OnInit {

  checked = false;
  public targets$: Observable<DtoPack<TargetModel>>;

  public readonly doneProgress = DONE_PROGRESS;
  public readonly undoneProgress = UNDONE_PROGRESS;
  public readonly gradientColors = { '0%': '#ff0000', '50%': '#ff0000', '75%': '#ff9900', '100%': '#0f0' };
  public expanderCache = {};

  constructor(
      @Inject('targets') private targetsId: BusOwner,
      @Inject('target') private targetId: BusOwner,
      private bus$: MixedBusService,
      private store$: DataStoreService,
      private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.targets$ = parseJsonDTOPack<TargetModel>(this.store$.of(this.targetsId), 'Targets');
  }

  check(task: TargetModel, target: TargetModel, progress: number = DONE_PROGRESS, template: TemplateRef<{}> = null): void {
    this.propagateProgress(task, progress);
    this.updateProgress(target);
    this.bus$.publish<CommandUpdate>(
      new CommandUpdate(
        this.targetId,
        { ...convertToJsonDTO(target, ['id']), id: target.id },
        {skipRoute: true}
      )
    );

    if (template) {
      this.notification.template(template, {nzData: {task, target}, nzPlacement: 'bottomRight'});
    }
  }

  undo(notify: NzNotificationComponent): void {
    const target = (notify.instance.options as NzNotificationDataOptions<{target: TargetModel}>).nzData.target;
    const task = (notify.instance.options as NzNotificationDataOptions<{task: TargetModel}>).nzData.task;
    this.check(task, target, UNDONE_PROGRESS);
    notify.close();
  }

  private propagateProgress(target: TargetModel, progress: number): void {
    if (target.tasks?.length > 0) {
      target.tasks.forEach(task => this.propagateProgress(task, progress));
    }
    target.progress = progress;
  }
  private updateProgress(target: TargetModel): void {
    if (target.tasks?.length > 0) {
        target.tasks.forEach( task => this.updateProgress(task));
        target.progress = this.calcProgress(target);
    }
  }

  private calcProgress(target: TargetModel): number {
    const value = target.tasks.reduce((r, v) => ({ total: r.total + 100, real: r.real + v.progress }), { total: 0, real: 0 });
    return value.total > 0 ? Math.floor(value.real / value.total * 100) : 0;
  }
}
