import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ByRoutePathResolver } from '../../../api/by-route-path.resolver';
import { StreamService } from '../../../api/streams/stream.service';
import { WorkshopsService } from '../../../api/workshops/workshops.service';
import { ComposeIcontabsPageComponent } from '../../router-compose/compose-icontabs-page/compose-icontabs-page.component';
import { InfoComponent } from './info/info.component';
import { MetricsComponent } from './metrics/metrics.component';
import { OverviewComponent } from './overview.component';

const routes: Routes = [
  {
    path: 'overview',
    component: ComposeIcontabsPageComponent,
    data: { header: {title: 'Достижение целей', subtitle: 'помощь в саморазвитии'}},
    children: [
      {
        path: 'metrics',
        data: { header: {title: 'Метрики', subtitle: 'отражают ваши достижения и цели', icon: 'pie-chart'}},
        component: MetricsComponent,
        resolve: {
            workbooks: 'workbooksEmitter',
            targets: 'targetsEmitter',
            questions: 'questionsEmitter',
            streams: StreamService,
            workshops: WorkshopsService
          },
      },
      {
      path: '',
      data: { header: {title: 'Информация', subtitle: 'контакты и группы сообщества', icon: 'info-circle'}},
      component: InfoComponent,
      resolve: {
          brif: ByRoutePathResolver
      },
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
