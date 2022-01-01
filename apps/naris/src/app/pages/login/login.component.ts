import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../api/auth/auth.service';
import { MEDIUM_TIMEOUT_INTERVAL } from '../../../environments/constants';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'soer-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  validateForm!: FormGroup;
  subscriptions: Subscription[] = [];

  loading = false;
  private isSkipChecks = false;

  private externalWindow: any;
  public jwt: string | null = null;
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (Object.prototype.hasOwnProperty.call(this.validateForm.controls, i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    
    this.isSkipChecks = this.route.snapshot.queryParams?.['skipchecks'] === 'true';

    if (!this.isSkipChecks) {
      this.subscriptions = [ this.auth.tokenUpdate$.subscribe(() => {
        this.checkJWT();
        this.loading = this.isSkipChecks || !!this.jwt;
      }) ];
      this.checkJWT(this.route.snapshot.queryParams?.['jwt']);
    }
  
    this.loading = this.isSkipChecks || !!this.jwt;


    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  checkJWT(defaultToken = undefined, isRedirect = true) {

    if (defaultToken) {
      this.auth.token  = this.jwt = defaultToken;
    } else {
      this.jwt = this.auth.token;
    }

    if (this.jwt && isRedirect) {
      this.redirectToHome();
    }
  }

  oAuthLogin(provider: 'patreon' | 'google'): void {

    this.externalWindow = this.popupCenter({
      url: provider === 'google' ? environment.googleAuthUrl : environment.patreonAuthUrl,
      title: '',
      w: 500,
      h: 500
    });

    const uid = setInterval(() => {
      try{
        const href = this.externalWindow?.['location']?.['href'] + '';
        if (href) {
          this.jwt = href.split('jwt=')[1];
          if (this.jwt) {
            this.loading = true;
            this.auth.token = this.jwt;
            if (this.externalWindow) {
              this.externalWindow.close();
            }
            clearInterval(uid);
            this.redirectToHome();
          }
        }
      }catch (e) { 
        console.log('Something goes wrong.');
      }
    }, MEDIUM_TIMEOUT_INTERVAL);
  }

  private popupCenter(params: any): any {
    const {url, title, w, h} = params;
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;

    const width = window.innerWidth ?
                  window.innerWidth :
                  document.documentElement.clientWidth
                      ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ?
                   window.innerHeight :
                   document.documentElement.clientHeight
                      ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    const newWindow = window.open(url, title,
      `
      scrollbars=yes,
      width=${w / systemZoom},
      height=${h / systemZoom},
      top=${top},
      left=${left}
      `
    );


    newWindow?.focus();

    return newWindow;
  }

  redirectToHome(): void {
    this.router.navigate(['pages']);
  }
}
