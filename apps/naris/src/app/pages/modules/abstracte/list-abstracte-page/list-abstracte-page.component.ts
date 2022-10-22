import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusEmitter, MixedBusService } from '@soer/mixed-bus';
import { CommandDelete, CommandEdit, CommandNew, CommandView, DataStoreService, DtoPack } from '@soer/sr-dto';
import { WorkbookModel } from '@soer/sr-editor';
import { Observable } from 'rxjs';
import { parseJsonDTOPack } from '../../../../api/json.dto.helpers';


@Component({
  selector: 'soer-list-abstracte-page',
  templateUrl: './list-abstracte-page.component.html',
  styleUrls: ['./list-abstracte-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListAbstractePageComponent {

  public name? = '';
  private workbooksId: BusEmitter;
  private workbookId: BusEmitter;
  workbook$: Observable<DtoPack<WorkbookModel>>;
  constructor(
    private bus$: MixedBusService,
    private store$: DataStoreService,
    private route: ActivatedRoute
  ) {
    this.name = this.route.snapshot.data['header'].title;
    
    this.workbooksId = this.route.snapshot.data['workbooks'];
    this.workbookId = {...this.workbooksId, key: {wid: '?'}}
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
