import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@soer/sr-auth';
import { SrDTOModule } from '@soer/sr-dto';
import { DefaultComponent } from './pages/default/default.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'pages',
          component: DefaultComponent,
          loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
          resolve: {
            manifest: 'manifestEmitter'
          },
          canActivate: [AuthGuard]},
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SrDTOModule.forChild({
      namespace: 'manifest',
      crudEmitters: {
        manifest: {create: '', read: 'user/manifest', update: '', delete: ''}
      }
    }),
    
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '!'},
    {provide: LocationStrategy, useClass: HashLocationStrategy},

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
