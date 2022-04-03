import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'node_modules/rxjs/dist/types';
import { DtoPack } from '@soer/sr-dto';
import { parseJsonDTOPack } from '../../../../api/json.dto.helpers';
import { WorkbookModel } from '../../../../api/workbook/workbook.model';
import { DataStoreService } from '@soer/sr-dto';
import { BusEmitter } from '@soer/mixed-bus';
import { MixedBusService } from '@soer/mixed-bus';

@Component({
  selector: 'soer-view-abstracte-page',
  templateUrl: './view-abstracte-page.component.html',
  styleUrls: ['./view-abstracte-page.component.scss']
})
export class ViewAbstractePageComponent {

  public workbook$: Observable<DtoPack<WorkbookModel>>;
  constructor(
    @Inject('workbook') private workbookId: BusEmitter,
    private bus$: MixedBusService,
    private store$: DataStoreService
  ) {
    this.workbook$ = parseJsonDTOPack<WorkbookModel>(this.store$.of(this.workbookId), 'workbook');
  }

}
