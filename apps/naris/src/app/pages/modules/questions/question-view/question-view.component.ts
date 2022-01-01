import { Component, Inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { QuestionModel } from '../../../../api/questions/question.model';
import { DataStoreService } from '../../../../packages/dto/services/data-store.service';
import { BusMessage, BusOwner } from '../../../../packages/mixed-bus/interfaces/mixed-bus.interface';
import { MixedBusService } from '../../../../packages/mixed-bus/mixed-bus.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss']
})
export class QuestionViewComponent implements OnInit {
  public readonly hostUrl = environment.host;
  public question$: Observable<QuestionModel[]>;
  constructor( @Inject('question') private questionId: BusOwner,
               private bus$: MixedBusService,
               private store$: DataStoreService,
               private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.question$ = this.store$.of(this.route.snapshot.data?.bus?.active || this.questionId).pipe(map<BusMessage, QuestionModel[]>(
      (data: BusMessage | null) => {
        return data?.result?.items ?? [];
      }
    ));
  }
}
