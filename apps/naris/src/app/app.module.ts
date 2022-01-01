import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import {MixedBusModule} from '@soer/mixed-bus';
import { SrUrlBuilderModule, UrlBuilderService } from '@soer/sr-url-builder';
import { MixedBusService } from '@soer/mixed-bus';
import { DataStoreService, StoreCrudService } from '@soer/sr-dto';
import { HttpClientModule } from '@angular/common/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(ru);

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule, 
    MixedBusModule,
    SrUrlBuilderModule.forRoot({apiRoot: 'test'}),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule

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
    },
    { provide: NZ_I18N, useValue: ru_RU }

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
