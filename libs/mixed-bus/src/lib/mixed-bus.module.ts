import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MixedBusService } from './mixed-bus.service';
import { TodosComponent } from './todos/todos.component';

@NgModule({
  imports: [CommonModule],
  providers: [MixedBusService],
  declarations: [
    TodosComponent
  ],
  exports: [
    TodosComponent
  ]
})
export class MixedBusModule {}