import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AuthEmitter } from './interfaces/auth-options.interface';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [CommonModule],
  providers: [
    AuthService
  ]
})
export class SrAuthModule {
  static forRoot(options: AuthEmitter): ModuleWithProviders<SrAuthModule> {
    return {
      ngModule: SrAuthModule,
      providers: [
        AuthGuard,
        {
          provide: 'AuthServiceConfig',
          useValue: options
        }
      ]
    }
  }  
}
