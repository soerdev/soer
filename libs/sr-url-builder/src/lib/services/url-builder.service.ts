import { Inject, Injectable } from '@angular/core';
import { UrlBuilderOptions } from '../interfaces/url-builder.interface';
import { BusKey, BusMessageParams }  from '@soer/mixed-bus';

@Injectable({
  providedIn: 'root'
})
export class UrlBuilderService {
  constructor(
    @Inject('UrlBuilderServiceConfig') private options: UrlBuilderOptions
  ) {
    console.log('Builder start with ', options);
  }

  build(apiSuffix: string = '', key: BusKey = {}, params: BusMessageParams = {}): string {
    let result = `${this.options.apiRoot}${apiSuffix}`;
    Object.keys(key).forEach(
      keyName => result = result.replace(`:${keyName}`, key[keyName])
    );
    Object.keys(params).forEach(
      paramName => result = result.replace(`:${paramName}`, params[paramName])
    );
    return result;  
  }
}
