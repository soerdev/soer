import { Component, Inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { QuestionModel } from '../../../../api/questions/question.model';
import { BusMessage, BusEmitter, MixedBusService } from '@soer/mixed-bus';
import { environment } from '../../../../../environments/environment';
import { DataStoreService } from '@soer/sr-dto';

@Component({
  selector: 'soer-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss']
})
export class QuestionViewComponent {
  public readonly hostUrl = environment.host;
  public question$: Observable<QuestionModel[]>;
  private questionId: BusEmitter;
  constructor( private store$: DataStoreService,
               private route: ActivatedRoute) { 
                this.questionId = this.route.snapshot.data['question'];
                this.question$ = this.store$.of(this.questionId).pipe(map<BusMessage, QuestionModel[]>(
                  (data: BusMessage | null) => {
                    return data?.payload?.items ?? [];
                  }
                ));
               }
               
}
