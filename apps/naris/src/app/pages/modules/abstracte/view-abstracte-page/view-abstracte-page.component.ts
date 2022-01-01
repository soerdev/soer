import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'node_modules/rxjs/dist/types';
import { DtoPack } from 'src/app/packages/dto/interfaces/dto.pack.interface';
import { parseJsonDTOPack } from '../../../../api/json.dto.helpers';
import { WorkbookModel } from '../../../../api/workbook/workbook.model';
import { DataStoreService } from '../../../../packages/dto/services/data-store.service';
import { BusOwner } from '../../../../packages/mixed-bus/interfaces/mixed-bus.interface';
import { MixedBusService } from '../../../../packages/mixed-bus/mixed-bus.service';

@Component({
  selector: 'app-view-abstracte-page',
  templateUrl: './view-abstracte-page.component.html',
  styleUrls: ['./view-abstracte-page.component.scss']
})
export class ViewAbstractePageComponent implements OnInit {

  public workbook$: Observable<DtoPack<WorkbookModel>>;
  constructor(
    @Inject('workbook') private workbookId: BusOwner,
    private bus$: MixedBusService,
    private store$: DataStoreService
  ) { }

  ngOnInit(): void {
    this.workbook$ = parseJsonDTOPack<WorkbookModel>(this.store$.of(this.workbookId), 'workbook');
  }

}
