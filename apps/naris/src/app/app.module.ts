import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import {MixedBusModule} from '@soer/mixed-bus';
import { SrUrlBuilderModule, UrlBuilderService } from '@soer/sr-url-builder';
import { MixedBusService } from '@soer/mixed-bus';
import { DataStoreService, StoreCrudService } from '@soer/sr-dto';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule, 
    MixedBusModule,
    SrUrlBuilderModule.forRoot({apiRoot: 'test'}),
    HttpClientModule

  ],

  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [UrlBuilderService, MixedBusService, DataStoreService, StoreCrudService],
      useFactory: (UrlBuilderService: UrlBuilderService,
                   MixedBusService: MixedBusService,
                   DataStoreService: DataStoreService,
                   StoreCrudService: StoreCrudService) => () => null
    }

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
