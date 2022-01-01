import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAbstractePageComponent } from './list-abstracte-page/list-abstracte-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { DumbModule } from '../../dumb/dumb.module';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { EditAbstractePageComponent } from './edit-abstracte-page/edit-abstracte-page.component';
import { MarkdownModule } from 'ngx-markdown';
import { ViewAbstractePageComponent } from './view-abstracte-page/view-abstracte-page.component';


@NgModule({
  declarations: [ListAbstractePageComponent, EditAbstractePageComponent, ViewAbstractePageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzDescriptionsModule,
    NzTimelineModule,
    NzProgressModule,
    NzBadgeModule,
    NzButtonModule,
    NzResultModule,
    NzIconModule,
    NzInputModule,
    NzCardModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    DumbModule,
    RouterModule,
    MarkdownModule.forRoot(),
  ]
})
export class AbstracteModule { }
