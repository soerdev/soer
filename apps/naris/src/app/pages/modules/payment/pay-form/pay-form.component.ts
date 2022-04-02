import { HttpClient } from '@angular/common/http';
import { Component, OnChanges} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '@soer/sr-auth';


@Component({
  selector: 'soer-pay-form',
  templateUrl: './pay-form.component.html',
  styleUrls: ['./pay-form.component.scss']
})
export class PayFormComponent implements OnChanges{
  public email = '';
  public role = 'GUEST';
  public payUrl = '';
  public remoteState: {status: string, messages: string[], actions: any[] } = {status: 'loading', messages: [], actions: []};

  constructor(private authService: AuthService,
    private router: Router,
    private http: HttpClient) 
  { 
      this.email = this.authService.getEmail();
      this.role = this.authService.getRole();
      this.payUrl = environment.payServiceUrl;
      this.checkRemoteStatus();
  }


  ngOnChanges(): void {
      console.log('?=> run');
  }
  checkRemoteStatus(): void {
    this.authService.renewToken().subscribe(result => console.log('Result2', this.authService.extractAndParseJWT(result.accessToken)));
    this.http.get(environment.host + '/api/seller/order/status/' + this.email)
    .subscribe( result => {
      const status = (result as any).status || 'ok';
      const messages = (result as any).messages || [];
      const actions = (result as any).actions || [];
      this.remoteState = {status, messages, actions};
  });
  }

  deletePayment(id?: number): void {
    this.remoteState.status = 'loading';
    this.http.get(environment.host + '/api/payservice/cancel/' + this.email + '/' + id).subscribe(result => {
      this.checkRemoteStatus();
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
