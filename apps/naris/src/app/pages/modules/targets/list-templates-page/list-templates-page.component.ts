import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusEmitter, MixedBusService } from '@soer/mixed-bus';
import { CommandCreate, CommandDelete, DataStoreService, DtoPack } from '@soer/sr-dto';
import { combineLatest, first, forkJoin, last, merge, Observable } from 'rxjs';
import { convertToJsonDTO, parseJsonDTOPack } from '../../../../api/json.dto.helpers';
import { TargetModel, TemplateModel } from '../../../../api/targets/target.interface';
@Component({
  selector: 'soer-list-templates-page',
  templateUrl: './list-templates-page.component.html',
  styleUrls: ['./list-templates-page.component.scss']
})
export class ListTemplatesPageComponent {
  public templates$: Observable<DtoPack<TargetModel>>;
  public isEditable = false;
  constructor(
      @Inject('template') private templateId: BusEmitter,
      @Inject('target') private targetId: BusEmitter,
      private store$: DataStoreService,
      private bus$: MixedBusService,
      private route: ActivatedRoute
  ) {
    this.templates$ = parseJsonDTOPack<TargetModel>(this.store$.of(this.route.snapshot.data['templates']), 'TargetsTemplates');
    this.isEditable = this.route.snapshot.data['isEditable'];
   }

   onUse(template: TemplateModel): void {
    this.bus$.publish(
      new CommandCreate(
        this.targetId,
        convertToJsonDTO(template, ['id']),
        {redirectTo: this.route.snapshot.data['redirectTo'], skipInfo: true}
      )
    );
   }
   onDelete(template: any): void {
    this.bus$.publish(
      new CommandDelete({...this.templateId, key:{tid: template.id}})
    );
   }
}
