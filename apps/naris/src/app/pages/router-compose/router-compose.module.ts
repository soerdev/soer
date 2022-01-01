import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComposeOnePageComponent } from './compose-one-page/compose-one-page.component';
import { ComposeTabPageComponent } from './compose-tab-page/compose-tab-page.component';
import { RouterModule } from '@angular/router';
import { DumbModule } from '../dumb/dumb.module';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';



@NgModule({
  declarations: [ComposeOnePageComponent, ComposeTabPageComponent],
  imports: [
    CommonModule,
    NzTabsModule,
    NzLayoutModule,
    NzGridModule,
    DumbModule,
    RouterModule,
  ],
  exports: [
    [ComposeOnePageComponent, ComposeTabPageComponent],
  ]
})
export class RouterComposeModule { }
