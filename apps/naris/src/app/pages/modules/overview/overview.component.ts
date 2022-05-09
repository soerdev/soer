import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { BusMessage, BusEmitter } from '@soer/mixed-bus';
import { parseJsonDTOPack } from '../../../api/json.dto.helpers';
import { QuestionModel } from '../../../api/questions/question.model';
import { PersonalTarget } from '../../../api/targets/target.interface';
import { WorkbookModel } from '../../../api/workbook/workbook.model';
import { DataStoreService, DtoPack } from '@soer/sr-dto';


@Component({
  selector: 'soer-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent {

  data;
  workbook$: Observable<DtoPack<WorkbookModel>>;
  question$: Observable<DtoPack<QuestionModel>>;
  target$: Observable<DtoPack<PersonalTarget>>;
  public metrics: {list$: Observable<any>, [key: string]: any}[];
  constructor(
    private route: ActivatedRoute,
    @Inject('workbooks') private workbooksId: BusEmitter,
    @Inject('targets') private targetsId: BusEmitter,
    @Inject('questions') private questionsId: BusEmitter,
    private store$: DataStoreService
  ) {
    this.data = this.route.snapshot.data;
    this.workbook$ = parseJsonDTOPack<WorkbookModel>(this.store$.of(this.workbooksId), 'workbooks');
    this.target$ = parseJsonDTOPack<PersonalTarget>(this.store$.of(this.targetsId), 'targets'); 
    this.question$ = this.store$.of(this.questionsId).pipe(map<BusMessage, DtoPack<QuestionModel>>(data => {
      return data.payload;
    })); 


    this.metrics = [
      {
        title: 'Цели',
        list$: this.target$,
        icon: 'check-circle',
        url: '#!/pages/targets'
      },
      {
        title: 'Конспекты',
        list$: this.workbook$,
        icon: 'solution',
        url: '#!/pages/workbook'
      },
      {
        title: 'Вопросы',
        list$: this.question$,
        icon: 'question',
        url: '#!/pages/qa'
      },
      {
        title: 'Стримы',
        list$: of({items: this.data['streams']}),
        icon: 'play-circle',
        url: '#!/pages/streams'
      },
      {
        title: 'Воркшопы',
        list$: of({items: this.data['workshops']}),
        icon: 'experiment',
        url: '#!/pages/workshops'
      },
      {
        title: 'Книга',
        list$: of({items: {length: '57'}}),
        suffix: '%',
        icon: 'book',
        url: '#!/pages/book'
      },
      {
        title: 'Исходники',
        list$: of({items: {length: '6'}}),
        icon: 'field-binary',
        url: '#!/pages/sources'
      }
    ];

   }
 
}
