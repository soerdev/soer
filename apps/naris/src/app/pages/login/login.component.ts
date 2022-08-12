import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@soer/sr-auth';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'soer-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading = true;

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.auth.token) {
      this.router.navigate(['pages']);
      return;
    }
    this.loading = false;
  }

  oAuthLogin(provider: 'patreon' | 'google' | 'yandex'): void {

    const urls = {
      'patreon': environment.patreonAuthUrl,
      'google': environment.googleAuthUrl,
      'yandex': environment.yandexAuthUrl
    };

    document.location = urls[provider];
    return;
  }

}
