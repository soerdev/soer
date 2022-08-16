import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ByRoutePathResolver } from '../../../api/by-route-path.resolver';
import { StreamService } from '../../../api/streams/stream.service';
import { TasksResolver } from '../../../api/tasks/tasks.resolver';
import { WorkshopsService } from '../../../api/workshops/workshops.service';

import { OverviewComponent } from './overview.component';
import { MetricsComponent } from './metrics/metrics.component';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [OverviewComponent, MetricsComponent, InfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    RouterModule,
    NzSpinModule,
    NzCardModule,
    NzIconModule,
    NzLayoutModule,
    NzDividerModule,
    NzStatisticModule,
    NzGridModule,
    NzTypographyModule,
  ],
  providers: [
    TasksResolver,
    StreamService,
    WorkshopsService,
    ByRoutePathResolver,
  ],
  exports: [],
})
export class OverviewModule {}
