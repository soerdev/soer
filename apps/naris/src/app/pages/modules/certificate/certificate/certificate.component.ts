import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '@soer/sr-auth';


@Component({
  selector: 'soer-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent {
  public email = '';
  public role = 'GUEST';
  public payUrl = '';
  public certUrl = '';
  public pendingPayment: {id?: number, amount?: number} = {};

  public hasCert = false;
  public certText = '';
  public certObject:any = null;

  constructor(private authService: AuthService,
    private router: Router,
    private http: HttpClient) 
  { 
      this.email = this.authService.getEmail();
      this.role = this.authService.getRole();
      this.payUrl = environment.payServiceUrl;
      this.http.get(environment.host + '/api/payservice/pending/' + this.email).subscribe(result => {
        this.pendingPayment = (result as any).pending_payment;
        console.log(this.pendingPayment);
      });
  }

  ngOnChanges(): void {
      console.log('?=> run');
  }
  cleanJWT(): void {
    this.authService.token = null;
  }

  deletePayment(id?: number): void {
    this.http.get(environment.host + '/api/payservice/cancel/' + this.email + '/' + id).subscribe(result => {
      if (this.pendingPayment.id === (result as any).pending_payment.id) {
        this.pendingPayment = {};
      }
    });
  }

  useCert(): void {
    this.http.get(environment.host + '/api/payservice/prepaid/' + this.email + '/' + this.getClearedCertText()).subscribe(result => {
      this.certObject.status = (result as any)['status'];
    });
  }

  certinfo(): void {
    const cert = this.authService.extractAndParseJWT(this.getClearedCertText());
    if (cert && cert.role) {
      this.certObject = {
        role: cert.role,
        status: 'pending',
        exp: new Date(cert.exp * 1000)
      }

      this.http.get(environment.host + '/api/payservice/prepaid_status/' + this.getClearedCertText()).subscribe(result => {
        this.certObject.status = (result as any)['status'];
      });
    } 
  }

  getClearedCertText(): string {
    return this.certText.replace(/[\n\r\s]*/g, '');
  }
}
