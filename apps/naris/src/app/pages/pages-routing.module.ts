import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SrDTOModule } from '@soer/sr-dto';
import { ByRoutePathResolver } from '../api/by-route-path.resolver';
import { StreamService } from '../api/streams/stream.service';
import { TasksResolver } from '../api/tasks/tasks.resolver';
import { WorkshopsService } from '../api/workshops/workshops.service';

import { FilesListComponent } from './components/files-list/files-list.component';
import { AbstracteRoutingModule } from './modules/abstracte/abstracte-routing.module';
import { WORKBOOKS_ID, WORKBOOK_ID } from './modules/abstracte/abstracte.const';
import { ComposeVideoPlayerComponent } from './modules/compose-video-player/compose-video-player.component';
import { OverviewComponent } from './modules/overview/overview.component';
import { QUESTIONS_ALL_ID, QUESTIONS_ID, QUESTION_ID } from './modules/questions/questions.const';
import { QuestionsRoutingModule } from './modules/questions/questions.routing.module';
import { RoadmapComponent } from './modules/roadmap/roadmap.component';
import { StreamsComponent } from './modules/streams/streams.component';
import { TargetsRoutingModule } from './modules/targets/targets-routing.module';

const routes: Routes = [
      { path: '', redirectTo: 'overview' },
      {
        path: 'overview',
        component: OverviewComponent,
        data: { header: {title: 'Брифинг', subtitle: 'кратко о возможностях и достижениях'}},
        resolve: {
          brif: ByRoutePathResolver,
          workbooks: 'workbooksEmitter',
          targets: 'targetsEmitter',
          questions: 'questionsEmitter'
        },
      },
      {
        path: 'streams',
        component: StreamsComponent,
        data: { header: {title: 'Архитектурные стримы', subtitle: 'грамотно строим работу над приложением'}},
        resolve: {streams: StreamService},
        children: [
          {
            path: ':videoId',
            component: ComposeVideoPlayerComponent,
            data: { header: {title: 'Смотрим стрим...'}}
          }
        ]
      },
      {
        path: 'workshops',
        component: StreamsComponent,
        data: { header: {title: 'Мастерклассы', subtitle: 'создаем приложение по шагам'}},
        resolve: {streams: WorkshopsService},
        children: [
          {
            path: ':videoId',
            component: ComposeVideoPlayerComponent,
            data: { header: {title: 'Смотрим воркшоп...'}}
          }
        ]
      },
      {
        path: 'book',
        component: RoadmapComponent,
        data: { header: {title: 'Главы книги', subtitle: 'быстрый старт в карьере'}},
        resolve: {
          target: ByRoutePathResolver
        },
      },
      {
        path: 'sources',
        component: FilesListComponent,
        data: { header: {title: 'Исходники проектов', subtitle: ''}},
        resolve: {
          webfiles: ByRoutePathResolver
        },
      }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),

    SrDTOModule.forChild({
      namespace: 'workbook',
      crudProviders: {
        workbook: WORKBOOK_ID,
        workbooks: WORKBOOKS_ID,
      }
    }),

    SrDTOModule.forChild({
      namespace: 'qa',
      crudProviders: {
        questionsAll: QUESTIONS_ALL_ID,
        questions: QUESTIONS_ID,
        question: QUESTION_ID
      }
    }),
    SrDTOModule.forChild({
      namespace: 'targets',
      crudProviders: {
        targets: {create: 'json/targets', read: 'json/targets', update: 'json/targets', delete: 'json/targets/:tid'},
        target: {create: 'json/targets', read: 'json/targets/:tid', update: 'json/targets', delete: 'json/targets/:tid'}
      }
    }),

    SrDTOModule.forChild({
      namespace: 'templates',
      crudProviders: {
        templates: {create: 'json/templates', read: 'json/public/templates', update: 'json/templates', delete: 'json/templates/:tid'},
        template: {create: 'json/templates', read: 'json/templates/:tid', update: 'json/templates', delete: 'json/templates/:tid'}
      }
    }),
    QuestionsRoutingModule,
    TargetsRoutingModule,
    AbstracteRoutingModule
  ],
  providers: [
    TasksResolver,
    StreamService,
    WorkshopsService,
    ByRoutePathResolver
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
