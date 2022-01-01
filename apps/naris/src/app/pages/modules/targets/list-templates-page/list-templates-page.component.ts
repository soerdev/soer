import { Component, Inject, OnInit } from '@angular/core';
import { BusOwner } from '@soer/mixed-bus';
import { DataStoreService, DtoPack } from '@soer/sr-dto';
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
      @Inject('targets') private targetsId: BusOwner,
      private store$: DataStoreService,
  ) {
    this.templates$ = parseJsonDTOPack<TargetModel>(this.store$.of(this.targetsId), 'TargetsTemplates');
   }
}
