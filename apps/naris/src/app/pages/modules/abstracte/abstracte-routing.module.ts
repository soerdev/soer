import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComposeOnePageComponent } from '../../router-compose/compose-one-page/compose-one-page.component';
import { WORKBOOK_TAG } from './abstracte.const';
import { EditAbstractePageComponent } from './edit-abstracte-page/edit-abstracte-page.component';
import { ListAbstractePageComponent } from './list-abstracte-page/list-abstracte-page.component';
import { ViewAbstractePageComponent } from './view-abstracte-page/view-abstracte-page.component';

const routes: Routes = [
  {
  path: WORKBOOK_TAG,
  component: ComposeOnePageComponent,
  data: { 
    header: {title: 'Конспекты', subtitle: 'помощь в осмыслении материалов по программированию'},
    controls: [
      {title: 'Добавить', path: ['create', 'new'], icon: 'plus'},
    ]
  },
  resolve: {
    workbooks: 'workbooksEmitter'
  },
  children: [
    { path: '',
      component: ListAbstractePageComponent,  
    },
    {
      path: 'create/:wid',
      component: EditAbstractePageComponent,
      data: { header: {
              title: 'Новый конспект',
              subtitle: 'помощь в осмыслении материалов по программированию'
            },
            controls: [
              {title: 'Просмотр', path: ['.'], toggle: 'preview', icon: 'eye/eye-invisible'},
              {title: 'Сохранить', path: ['.'], action: 'save', icon: 'save'},
              {title: 'Назад', path: ['../..'], icon: 'rollback'},
            ]
        
      },
      resolve: {
        workbook: 'workbookEmitter'
      }
    },
    {
      path: 'edit/:wid',
      component: EditAbstractePageComponent,
      data: { header: {
              title: 'Изменить конспект',
              subtitle: 'помощь в осмыслении материалов по программированию'
            },
            controls: [
              {title: 'Просмотр', path: ['.'], toggle: 'preview', icon: 'eye/eye-invisible'},
              {title: 'Сохранить', path: ['.'], action: 'save', icon: 'save'},
              {title: 'Назад', path: ['../..'], icon: 'rollback'},
            ]

      },
      resolve: {
        workbook: 'workbookEmitter'
      },

    },
    {
      path: 'view/:wid',
      component: ViewAbstractePageComponent,
      data: { header: {
              title: 'Конспект',
              subtitle: 'помощь в осмыслении материалов по программированию'
            }
      },
      resolve: {
        workbook: 'workbookEmitter'
      },

    }
  ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AbstracteRoutingModule { }
