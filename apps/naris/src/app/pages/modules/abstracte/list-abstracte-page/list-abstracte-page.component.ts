import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { WorkbookModel } from '../../../../api/workbook/workbook.model';
import { Observable } from 'rxjs';
import { CommandDelete, CommandEdit, CommandNew, CommandRead, CommandView } from '../../../../packages/dto/bus-messages/bus.messages';
import { parseJsonDTOPack } from '../../../../api/json.dto.helpers';
import { MixedBusService } from '../../../../packages/mixed-bus/mixed-bus.service';
import { DataStoreService } from '../../../../packages/dto/services/data-store.service';
import { DtoPack } from '../../../../packages/dto/interfaces/dto.pack.interface';
import { BusOwner } from '../../../../packages/mixed-bus/interfaces/mixed-bus.interface';

@Component({
  selector: 'app-list-abstracte-page',
  templateUrl: './list-abstracte-page.component.html',
  styleUrls: ['./list-abstracte-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListAbstractePageComponent implements OnInit {

  workbook$: Observable<DtoPack<WorkbookModel>>;

  constructor(
    @Inject('workbook') private workbookId: BusOwner,
    @Inject('workbooks') private workbooksId: BusOwner,
    private bus$: MixedBusService,
    private store$: DataStoreService
  ) {}

  ngOnInit(): void {
    this.workbook$ = parseJsonDTOPack<WorkbookModel>(this.store$.of(this.workbooksId), 'workbooks');
  }

  workbookDelete(workbook: WorkbookModel): void {
    this.bus$.publish<CommandDelete>(
      new CommandDelete(
        this.workbookId,
        workbook,
        {wid: workbook.id}
      )
  );
  }

  workbookEdit(workbook: WorkbookModel): void {
    this.bus$.publish<CommandEdit>(
      new CommandEdit(
        this.workbookId,
        workbook
      )
    );
  }

  workbookView(workbook: WorkbookModel): void {
    this.bus$.publish<CommandView>(
      new CommandView(
        this.workbookId,
        workbook
      )
    );
  }

  createWorkbook(): void {
    this.bus$.publish<CommandNew>(
        new CommandNew(
          this.workbookId
        )
    );
  }

}
