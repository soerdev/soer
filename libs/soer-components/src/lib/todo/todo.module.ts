import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    NzIconModule,
    NzButtonModule,
    NzTypographyModule
  ],
  exports: [TodoComponent]
})
export class TodoModule {}
