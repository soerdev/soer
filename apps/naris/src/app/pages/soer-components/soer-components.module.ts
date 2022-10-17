import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { TopicsListComponent } from './topics-list/topics-list.component';



@NgModule({
  declarations: [TopicsListComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    NzLayoutModule,
    NzGridModule,
    NzIconModule,
    NzCardModule
  ],
  exports: [TopicsListComponent]
})
export class SoerComponentsModule { }
