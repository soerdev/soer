import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlBuilderOptions } from './interfaces/url-builder.interface';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SrUrlBuilderModule { 
  static forRoot(options: UrlBuilderOptions): ModuleWithProviders<SrUrlBuilderModule> {
    return {
      ngModule: SrUrlBuilderModule,
      providers: [
        {
          provide: 'UrlBuilderServiceConfig',
          useValue: options
        }
      ]
    }
  }  
}
