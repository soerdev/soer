import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComposeOnePageComponent } from '../../router-compose/compose-one-page/compose-one-page.component';
import { ComposeVideoPlayerComponent } from '../compose-video-player/compose-video-player.component';
import { ListQuestionsPageComponent } from './list-questions-page/list-questions-page.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuestionViewComponent } from './question-view/question-view.component';

const routes: Routes = [
  {
    path: 'qa',
    component: ComposeOnePageComponent,
    children: [
      { path: '', redirectTo: 'my', pathMatch: 'prefix'},
      {
        path: 'my',
        component: ListQuestionsPageComponent,
        data: {
          header: { title: 'Вопросы и ответы', subtitle: 'здесь можно получить аудио-ответ' },
          controls: [
            {title: 'Добавить', path: ['..', 'create', 'new'], icon: 'plus'},
          ]
        },
        resolve: {
          questions: 'questionsEmitter'
        },
        children: [
          {
            path: 'show/video/:videoId',
            component: ComposeVideoPlayerComponent,
            data: { header: {title: 'Видео ответ'}}
          }
        ]
      },
      {
        path: 'create/new',
        component: QuestionFormComponent,
        data: {
          header: {title: 'Новый вопрос', subtitle: 'любые вопросы на айти тематику'},
          controls: [
            {title: 'Сохранить', path: ['.'], action: 'save', icon: 'save'},
            {title: 'Назад', path: ['../..'], icon: 'rollback'},
          ]
        }
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
