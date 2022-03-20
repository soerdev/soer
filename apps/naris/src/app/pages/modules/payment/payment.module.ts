import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayFormComponent } from './pay-form/pay-form.component';
import { PayService } from './pay.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzBadgeModule } from 'ng-zorro-antd/badge';



@NgModule({
  declarations: [
    PayFormComponent
  ],
  providers: [
    PayService
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzAlertModule,
    NzDividerModule,
    RouterModule
  ]
})
export class PaymentModule { }
