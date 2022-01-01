import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { WorkbookModel } from '../../../../api/workbook/workbook.model';
import { Observable } from 'rxjs';
import { CommandDelete, CommandEdit, CommandNew, CommandRead, CommandView, DtoPack } from '@soer/sr-dto';
import { parseJsonDTOPack } from '../../../../api/json.dto.helpers';
import { BusOwner, MixedBusService } from '@soer/mixed-bus';
import { DataStoreService } from '@soer/sr-dto';


@Component({
  selector: 'soer-list-abstracte-page',
  templateUrl: './list-abstracte-page.component.html',
  styleUrls: ['./list-abstracte-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListAbstractePageComponent {

  workbook$: Observable<DtoPack<WorkbookModel>>;

  constructor(
    @Inject('workbook') private workbookId: BusOwner,
    @Inject('workbooks') private workbooksId: BusOwner,
    private bus$: MixedBusService,
    private store$: DataStoreService
  ) {
    this.workbook$ = parseJsonDTOPack<WorkbookModel>(this.store$.of(this.workbooksId), 'workbooks');
  }

  workbookDelete(workbook: WorkbookModel): void {
    this.bus$.publish(
      new CommandDelete(
        this.workbookId,
        workbook,
        {wid: workbook.id}
      )
  );
  }

  workbookEdit(workbook: WorkbookModel): void {
    this.bus$.publish(
      new CommandEdit(
        this.workbookId,
        workbook
      )
    );
  }

  workbookView(workbook: WorkbookModel): void {
    this.bus$.publish(
      new CommandView(
        this.workbookId,
        workbook
      )
    );
  }

  createWorkbook(): void {
    this.bus$.publish(
        new CommandNew(
          this.workbookId
        )
    );
  }

}
