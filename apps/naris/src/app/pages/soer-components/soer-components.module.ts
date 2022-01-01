import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicsListComponent } from './topics-list/topics-list.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';



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
