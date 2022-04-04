import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayFormComponent } from './pay-form/pay-form.component';
import { PayService } from './pay.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { SrDTOModule } from '@soer/sr-dto';



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
    NzIconModule,
    NzCheckboxModule,
    NzInputModule,
    NzSpinModule,
    RouterModule,
    FormsModule,
    SrDTOModule
  ]
})
export class PaymentModule { }
