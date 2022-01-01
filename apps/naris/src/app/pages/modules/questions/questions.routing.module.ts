import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComposeOnePageComponent } from '../../router-compose/compose-one-page/compose-one-page.component';
import { ComposeVideoPlayerComponent } from '../compose-video-player/compose-video-player.component';
import { ListQuestionsPageComponent } from './list-questions-page/list-questions-page.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuestionViewComponent } from './question-view/question-view.component';
import { QUESTIONS_ALL_ID, QUESTIONS_ID, QUESTION_ID } from './questions.const';

const routes: Routes = [
  {
    path: 'qa',
    component: ComposeOnePageComponent,
    data: {
      header: { title: 'Вопросы и ответы', subtitle: 'здесь можно получить аудио-ответ' },
      bus: {
        single: QUESTION_ID,
        list: QUESTIONS_ID
      }
    },
    resolve: {
      questions: 'questionsEmitter'
    },
    children: [
      { path: '', redirectTo: 'my'},
      {
        path: 'my',
        data: {bus: {active: QUESTIONS_ID}},
        component: ListQuestionsPageComponent,
        children: [
          {
            path: 'show/video/:videoId',
            component: ComposeVideoPlayerComponent,
            data: { header: {title: 'Видео ответ'}}
          }
        ]
      },
      {
        path: 'new',
        component: QuestionFormComponent
      },
      {
          path: 'show/video/:videoId',
          component: ComposeVideoPlayerComponent,
          data: { header: {title: 'Видео ответ'}},
          outlet: 'popup'
      },
      {
          path: 'show/answer/:qid',
          component: QuestionViewComponent,
          data: {
            header: {title: 'Ответ на вопрос'},
            bus: {
              active: QUESTION_ID
            }
          },
          resolve: {
            question: 'questionEmitter'
          },
          outlet: 'popup'
      },

        {
          path: 'all',
          component: ListQuestionsPageComponent,
          data: {
            header: {title: 'Все вопросы', subtitle: 'ответы на все вопросы'},
            bus: {active: QUESTIONS_ALL_ID},
          },
          resolve: {
            questions: 'questionsAllEmitter'
          },
          children: [
            {
              path: 'show/video/:videoId',
              component: ComposeVideoPlayerComponent,
              data: { header: {title: 'Видео ответ'}}
            }
          ]
        }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
