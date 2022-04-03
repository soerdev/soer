import { Component, Inject, OnInit } from '@angular/core';
import { BusEmitter, MixedBusService } from '@soer/mixed-bus';
import { CommandDelete, DataStoreService, DtoPack } from '@soer/sr-dto';
import { Observable } from 'rxjs';
import { parseJsonDTOPack } from '../../../../api/json.dto.helpers';
import { TargetModel } from '../../../../api/targets/target.interface';
@Component({
  selector: 'soer-list-templates-page',
  templateUrl: './list-templates-page.component.html',
  styleUrls: ['./list-templates-page.component.scss']
})
export class ListTemplatesPageComponent {
  public templates$: Observable<DtoPack<TargetModel>>;
  constructor(
      @Inject('templates') private templatesId: BusEmitter,
      @Inject('template') private templateId: BusEmitter,
      private store$: DataStoreService,
      private bus$: MixedBusService
  ) {
    this.templates$ = parseJsonDTOPack<TargetModel>(this.store$.of(this.templatesId), 'TargetsTemplates');
   }

   onDelete(template: any): void {
    this.bus$.publish(
      new CommandDelete(this.templateId, {}, {tid: template.id})
    );
   }
}
