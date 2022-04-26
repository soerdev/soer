import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { convertToJsonDTO, parseJsonDTOPack } from '../../../../api/json.dto.helpers';
import { TargetModel } from '../../../../api/targets/target.interface';
import { CommandCancel, CommandDelete, CommandUpdate } from '@soer/sr-dto';
import { DtoPack } from '@soer/sr-dto';
import { DataStoreService } from '@soer/sr-dto';
import { BusEmitter } from '@soer/mixed-bus';
import { MixedBusService } from '@soer/mixed-bus';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'soer-task-edit-form',
  templateUrl: './task-edit-form.component.html',
  styleUrls: ['./task-edit-form.component.scss']
})
export class TaskEditFormComponent {
  target$: Observable<DtoPack<TargetModel>>;
  public history: {ind: number, title: string}[] = [];

  private targetId;
  constructor(
    private bus$: MixedBusService,
    private store$: DataStoreService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.targetId =  this.route.snapshot.data['target'];
    this.target$ = parseJsonDTOPack<TargetModel>(this.store$.of(this.targetId), 'Targets edit');
  }

  onSave(target: TargetModel): void {
    this.bus$.publish(
      new CommandUpdate(
        this.targetId,
        { ...convertToJsonDTO(target, ['id']), id: target.id},
        {skipRoute: true, skipInfo: true}
      )
    );
  }

  createTask(target: TargetModel, title: any): void {
    target.tasks = target.tasks || [];
    target.tasks.push({title: title.value, overview: '', progress: 0, tasks: []});
    title.value = '';
    this.onSave(target);
  }



  onDelete(target: TargetModel): void {
    this.bus$.publish(
      new CommandDelete(
        this.targetId,
        target,
        {tid: target.id}
      )
    );
  }

  onCreateTemplate(target: TargetModel): void {
    this.router.navigate(['/pages/targets', {outlets: {popup: ['target', target.id, 'template', 'create']}}]);
    /*this.bus$.publish(
      new CommandCreate(
        this.templateId,
        { ...convertToJsonDTO({overview: 'Some text here', target}, ['id']), accessTag: 'ALL'},
        {skipRoute: true, skipInfo: true}
      )
    );*/
  }

  onCancel(): void {
    this.bus$.publish(
      new CommandCancel(
        this.targetId
      )
    );
  }
}
