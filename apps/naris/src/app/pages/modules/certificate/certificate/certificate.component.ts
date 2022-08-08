import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { AuthService, JWTModel } from '@soer/sr-auth';
import { BusEmitter } from '@soer/mixed-bus';
import { DataStoreService, DtoPack, extractDtoPackFromBus } from '@soer/sr-dto';
import { Observable } from 'rxjs';


@Component({
  selector: 'soer-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent {
  public certUrl = '';

  public hasCert = false;
  public certText = '';
  public certObject:any = null;
  public user$: Observable<DtoPack<JWTModel>>;

  constructor(
    @Inject('manifest') private manifestId: BusEmitter,
    private authService: AuthService,
    private store$: DataStoreService,
    private router: Router,
    private http: HttpClient) 
  { 
      this.user$ = extractDtoPackFromBus<JWTModel>(this.store$.of(this.manifestId));
  }

  useCert(email: string): void {
    this.http.get(environment.host + '/api/v2/seller/prepaid/' + email + '/' + this.getClearedCertText()).subscribe(result => {
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

      this.http.get(environment.host + '/api/v2/seller/prepaid_status/' + this.getClearedCertText()).subscribe(result => {
        this.certObject.status = (result as any)['status'];
      });
    } 
  }

  getClearedCertText(): string {
    return this.certText.replace(/[\n\r\s]*/g, '');
  }
}
