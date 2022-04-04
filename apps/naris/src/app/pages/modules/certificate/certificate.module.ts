import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateComponent } from './certificate/certificate.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SrDTOModule } from '@soer/sr-dto';



@NgModule({
  declarations: [
    CertificateComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    NzButtonModule,
    NzAlertModule,
    NzDividerModule,
    NzIconModule,
    NzCheckboxModule,
    NzInputModule,
    RouterModule,
    FormsModule,
    SrDTOModule
  ]
})
export class CertificateModule { }
