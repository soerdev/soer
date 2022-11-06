import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, NzButtonModule, NzIconModule],
  exports: [ToolbarComponent]
})
export class ToolbarModule {}
