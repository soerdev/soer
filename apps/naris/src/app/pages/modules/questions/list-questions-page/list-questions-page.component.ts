import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BusMessage, BusEmitter } from '@soer/mixed-bus';
import { QuestionModel } from '../../../../api/questions/question.model';
import { CommandDelete, CommandNew } from '@soer/sr-dto';
import { DataStoreService } from '@soer/sr-dto';
import { MixedBusService } from '@soer/mixed-bus';
import { environment } from '../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'soer-list-questions-page',
  templateUrl: './list-questions-page.component.html',
  styleUrls: ['./list-questions-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListQuestionsPageComponent  {

  hostUrl = environment.host;
  question$: Observable<QuestionModel[]> | null;
  selectedQuestion: QuestionModel | null = null;
  constructor( @Inject('question') private questionId: BusEmitter,
               private bus$: MixedBusService,
               private store$: DataStoreService,
               private route: ActivatedRoute
  ) { 
    this.question$ = this.store$.of(this.route.snapshot.data['questions']).pipe(map<BusMessage, QuestionModel[]>(
      (data: BusMessage | null) => {
        return data?.payload?.items ?? [];
      }
    ));
  }

  questionDelete(workbook: QuestionModel): void {
    this.bus$.publish(
      new CommandDelete(
        this.questionId,
        workbook,
        {qid: workbook.id}
      )
  );
  }

  questionPlay(question: QuestionModel): void {
    this.selectedQuestion = question;
  }

  createQuestion(): void {
    this.bus$.publish(
      new CommandNew(
        this.questionId
      )
    );
  }

  close(): void {
    this.selectedQuestion = null;
  }
}
