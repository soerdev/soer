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
    const urlSegments =  apiSuffix.split('/').map(part => {
      if (part[0] === ':') {
        const keyName = part.substring(1);
        return ((key[keyName] === '?') ? params[keyName] : key[keyName]) || '';
      }
      return part;
    }).filter(value => !!value);
    return `${this.options.apiRoot}${urlSegments.join('/')}`;  
  }
}
