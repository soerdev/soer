import { Inject, Injectable } from '@angular/core';
import { UrlBuilderOptions } from '../interfaces/url-builder.interface';

@Injectable({
  providedIn: 'root'
})
export class UrlBuilderService {
  constructor(
    @Inject('UrlBuilderServiceConfig') private options: UrlBuilderOptions
  ) {
    console.log('Builder start with ', options);
  }

  build(apiSuffix: string = '', params: {[key: string]: any}): string {
    let result = `${this.options.apiRoot}${apiSuffix}`;
    Object.keys(params).forEach(
      param => result = result.replace(`:${param}`, params[param])
    );
    return result;  
  }
}
