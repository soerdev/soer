import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { convertToJsonDTO, parseJsonDTOPack } from 'src/app/api/json.dto.helpers';
import { TargetModel } from 'src/app/api/targets/target.interface';
import { CommandCancel, CommandDelete, CommandUpdate } from 'src/app/packages/dto/bus-messages/bus.messages';
import { DtoPack } from 'src/app/packages/dto/interfaces/dto.pack.interface';
import { DataStoreService } from 'src/app/packages/dto/services/data-store.service';
import { BusOwner } from 'src/app/packages/mixed-bus/interfaces/mixed-bus.interface';
import { MixedBusService } from 'src/app/packages/mixed-bus/mixed-bus.service';


@Component({
  selector: 'app-task-edit-form',
  templateUrl: './task-edit-form.component.html',
  styleUrls: ['./task-edit-form.component.scss']
})
export class TaskEditFormComponent implements OnInit {
  target$: Observable<DtoPack<TargetModel>>;
  public history: {ind: number, title: string}[] = [];

  constructor(
    @Inject('target') private targetId: BusOwner,
    private bus$: MixedBusService,
    private store$: DataStoreService
  ) { }

  ngOnInit(): void {
    this.target$ = parseJsonDTOPack<TargetModel>(this.store$.of(this.targetId), 'Targets');
  }

  onSave(target: TargetModel): void {
    this.bus$.publish<CommandUpdate>(
      new CommandUpdate(
        this.targetId,
        { ...convertToJsonDTO(target, ['id']), id: target.id},
        {skipRoute: true, skipInfo: true}
      )
    );
  }

  createTask(target: TargetModel, title): void {
    target.tasks = target.tasks || [];
    target.tasks.push({title: title.value, overview: '', progress: 0, tasks: []});
    title.value = '';
    this.onSave(target);
  }



  onDelete(target: TargetModel): void {
    this.bus$.publish<CommandDelete>(
      new CommandDelete(
        this.targetId,
        target,
        {tid: target.id}
      )
    );
  }

  onCancel(): void {
    this.bus$.publish<CommandCancel>(
      new CommandCancel(
        this.targetId
      )
    );
  }
}
