import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { AimRawComponent } from './aim-raw/aim-raw.component';
import { AimsTreeComponent } from './aims-tree/aims-tree.component';
import { TodoModule } from '../todo';
import { TargetComponent } from './target/target.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TargetService } from './target.service';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
  declarations: [AimsTreeComponent, AimRawComponent, TargetComponent],
  imports: [
    CommonModule,
    TodoModule,
    ToolbarModule,
    NzProgressModule,
    NzIconModule,
    NzButtonModule,
    NzCardModule,
    NzGridModule,
    NzGridModule,
    NzTypographyModule
  ],
  providers: [TargetService],
  exports: [AimsTreeComponent, TargetComponent],
})
export class AimsTreeModule {}
