import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnChanges} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { AuthService, JWTModel } from '@soer/sr-auth';
import { first, Observable } from 'rxjs';
import { BusEmitter } from '@soer/mixed-bus';
import { DataStoreService, DtoPack, extractDtoPackFromBus, OK } from '@soer/sr-dto';


@Component({
  selector: 'soer-pay-form',
  templateUrl: './pay-form.component.html',
  styleUrls: ['./pay-form.component.scss']
})
export class PayFormComponent {
  public payUrl = '';
  public remoteState: {status: string, messages: string[], actions: any[] } = {status: 'loading', messages: [], actions: []};
  public user: Observable<DtoPack<JWTModel>>;
  
  constructor(
    @Inject('manifest') private manifestId: BusEmitter,
    private authService: AuthService,
    private store$: DataStoreService,
    private router: Router,
    private http: HttpClient) 
  { 
      this.user = extractDtoPackFromBus<JWTModel>(this.store$.of(this.manifestId));
      this.user.subscribe(data => {
        if (data.status === OK) {
          const userManifest = data.items[0];
          this.checkRemoteStatus(userManifest.email);
        }
      });
      this.payUrl = environment.payServiceUrl;
  }


  checkRemoteStatus(email: string): void {
    this.http.get(environment.host + '/api/seller/order/status/' + email)
    .subscribe( result => {
      const status = (result as any).status || 'ok';
      const messages = (result as any).messages || [];
      const actions = (result as any).actions || [];
      this.remoteState = {status, messages, actions};
  });
  }

  deletePayment(id: number, email: string): void {
    this.remoteState.status = 'loading';
    this.http.get(environment.host + '/api/payservice/cancel/' + email + '/' + id).subscribe(result => {
      this.checkRemoteStatus(email);
    });
  }

  renewToken(): void {
    this.router.navigate(['login']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
