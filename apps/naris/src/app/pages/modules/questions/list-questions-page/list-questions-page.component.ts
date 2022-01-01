import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BusMessage, BusOwner } from '../../../../packages/mixed-bus/interfaces/mixed-bus.interface';
import { QuestionModel } from '../../../../api/questions/question.model';
import { CommandDelete, CommandNew } from '../../../../packages/dto/bus-messages/bus.messages';
import { DataStoreService } from '../../../../packages/dto/services/data-store.service';
import { MixedBusService } from '../../../../packages/mixed-bus/mixed-bus.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-list-questions-page',
  templateUrl: './list-questions-page.component.html',
  styleUrls: ['./list-questions-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListQuestionsPageComponent implements OnInit {

  hostUrl = environment.host;
  question$: Observable<QuestionModel[]>;
  selectedQuestion = null;
  constructor( @Inject('questionsAll') private questionsId: BusOwner,
               @Inject('question') private questionId: BusOwner,
               private bus$: MixedBusService,
               private store$: DataStoreService,
               private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.question$ = this.store$.of(this.route.snapshot.data?.bus?.active || this.questionsId).pipe(map<BusMessage, QuestionModel[]>(
      (data: BusMessage | null) => {
        return data?.result?.items ?? [];
      }
    ));
  }

  questionDelete(workbook: QuestionModel): void {
    this.bus$.publish<CommandDelete>(
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
    this.bus$.publish<CommandNew>(
      new CommandNew(
        this.questionId
      )
    );
  }

  close(): void {
    this.selectedQuestion = null;
  }
}
