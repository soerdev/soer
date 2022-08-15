import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@soer/sr-auth';

@Component({
  selector: 'soer-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  private jwt: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jwt = this.route.snapshot.queryParams?.['jwt'] ?? null;
    this.checkJWT(this.jwt);
  }

  checkJWT(token: string | null): void {
    console.log('???', token);
    if (token) {
      this.jwt = token;
      localStorage.setItem('token', this.jwt);
      this.redirectToHome();
      return;
    } 
    this.redirectToLogin();
  }

  redirectToHome(): void {
    this.router.navigate(['pages']);
  }

  redirectToLogin(): void {
    this.router.navigate(['login']);
  }

}
