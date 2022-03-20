import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MEDIUM_TIMEOUT_INTERVAL } from '../../../../../environments/constants';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../api/auth/auth.service';


@Component({
  selector: 'soer-pay-form',
  templateUrl: './pay-form.component.html',
  styleUrls: ['./pay-form.component.scss']
})
export class PayFormComponent {
  public email = '';
  public role = 'GUEST';
  public payUrl = '';

  constructor(private authService: AuthService, private router: Router) 
  { 
      this.email = this.authService.getEmail();
      this.role = this.authService.getRole();
      this.payUrl = environment.payServiceUrl;
  }

  cleanJWT(): void {
    this.authService.token = null;
  }
}
