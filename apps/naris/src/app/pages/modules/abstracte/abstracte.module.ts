import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SrDTOModule } from '@soer/sr-dto';
import { SrEditorModule } from '@soer/sr-editor';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { MarkdownModule } from 'ngx-markdown';
import { DumbModule } from '../../dumb/dumb.module';
import { SoerComponentsModule } from '../../soer-components/soer-components.module';
import { EditAbstracteFormComponent } from './edit-abstracte-form/edit-abstracte-form.component';
import { EditAbstractePageComponent } from './edit-abstracte-page/edit-abstracte-page.component';
import { ListAbstractePageComponent } from './list-abstracte-page/list-abstracte-page.component';
import { ViewAbstractePageComponent } from './view-abstracte-page/view-abstracte-page.component';

@NgModule({
  declarations: [
    ListAbstractePageComponent,
    EditAbstractePageComponent,
    ViewAbstractePageComponent,
    EditAbstracteFormComponent
  ],
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
    NzPopconfirmModule,
    DumbModule,
    RouterModule,
    MarkdownModule.forRoot(),
    SrDTOModule,
    SoerComponentsModule,
    SrEditorModule
  ],
})
export class AbstracteModule {}
