import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComposeOnePageComponent } from './compose-one-page/compose-one-page.component';
import { ComposeTabPageComponent } from './compose-tab-page/compose-tab-page.component';
import { RouterModule } from '@angular/router';
import { DumbModule } from '../dumb/dumb.module';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ComposeIcontabsPageComponent } from './compose-icontabs-page/compose-icontabs-page.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    ComposeOnePageComponent,
    ComposeTabPageComponent,
    ComposeIcontabsPageComponent,
  ],
  imports: [
    CommonModule,
    NzTabsModule,
    NzLayoutModule,
    NzGridModule,
    DumbModule,
    RouterModule,
    NzIconModule,
    NzButtonModule
  ],
  exports: [[ComposeOnePageComponent, ComposeTabPageComponent, ComposeIcontabsPageComponent]],
})
export class RouterComposeModule {}
