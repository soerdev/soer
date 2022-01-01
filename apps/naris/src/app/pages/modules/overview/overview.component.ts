import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { BusMessage, BusOwner } from '../../../packages/mixed-bus/interfaces/mixed-bus.interface';
import { parseJsonDTOPack } from '../../../api/json.dto.helpers';
import { QuestionModel } from '../../../api/questions/question.model';
import { PersonalTarget } from '../../../api/targets/target.interface';
import { WorkbookModel } from '../../../api/workbook/workbook.model';
import { DtoPack } from '../../../packages/dto/interfaces/dto.pack.interface';
import { DataStoreService } from '../../../packages/dto/services/data-store.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent implements OnInit {

  data;
  workbook$: Observable<DtoPack<WorkbookModel>>;
  question$: Observable<DtoPack<QuestionModel>>;
  target$: Observable<DtoPack<PersonalTarget>>;
  constructor(
    private route: ActivatedRoute,
    @Inject('workbooks') private workbooksId: BusOwner,
    @Inject('targets') private targetsId: BusOwner,
    @Inject('questions') private questionsId: BusOwner,
    private store$: DataStoreService
  ) { }

  ngOnInit(): void {
    this.data = this.route.snapshot.data;
    this.workbook$ = parseJsonDTOPack<WorkbookModel>(this.store$.of(this.workbooksId), 'workbooks');
    this.target$ = parseJsonDTOPack<PersonalTarget>(this.store$.of(this.targetsId), 'targets'); 
    this.question$ = this.store$.of(this.questionsId).pipe(map<BusMessage, DtoPack<QuestionModel>>(data => {
      return data.result;
    })); 
  }
}
