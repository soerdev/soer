import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComposeOnePageComponent } from '../../router-compose/compose-one-page/compose-one-page.component';
import { ComposeTabPageComponent } from '../../router-compose/compose-tab-page/compose-tab-page.component';
import { ListAimsPageComponent } from './list-aims-page/list-aims-page.component';
import { ListTargetsPageComponent } from './list-targets-page/list-targets-page.component';
import { ListTemplatesPageComponent } from './list-templates-page/list-templates-page.component';
import { TargetEditFormComponent } from './target-edit-form/target-edit-form.component';
import { TaskEditFormComponent } from './task-edit-form/task-edit-form.component';

const routes: Routes = [
  {
    path: 'targets',
    component: ComposeTabPageComponent,
    data: { header: {title: 'Достижение целей', subtitle: 'помощь в саморазвитии'}},
    children: [
      {
        path: '',
        data: { header: {title: 'Сегодня', subtitle: 'текущие задачи'}},
        component: ListAimsPageComponent,
        resolve: {
          targets: 'targetsEmitter'
        }
      },
      {
        path: 'list',
        data: { header: {title: 'Цели', subtitle: 'Установите новые цели'}},
        component: ListTargetsPageComponent,
        resolve: {
          targets: 'targetsEmitter'
        }
      },
      {
        path: 'templates',
        data: { header: {title: 'Шаблоны', subtitle: 'Выберите стандартную цель для достижения'}},
        component: ListTemplatesPageComponent
      },
      {
        path: 'target/new',
        component: TargetEditFormComponent,
        outlet: 'popup'
      },
      {
        path: 'target/edit/:tid',
        component: TaskEditFormComponent,
        resolve: {
          target: 'targetEmitter'
        },
        outlet: 'popup'
      }
    ]
  },
  {
    path: 'targets/edit/:tid',
    component: ComposeOnePageComponent,
    children: [
      {
        path: '',
        component: TaskEditFormComponent,
        resolve: {
          target: 'targetEmitter'
        }
      }
    ]
  },
  {
    path: 'targets/new',
    component: ComposeOnePageComponent,
    children: [
      {
        path: '',
        component: TargetEditFormComponent,
        resolve: {
          target: 'targetEmitter'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetsRoutingModule { }
