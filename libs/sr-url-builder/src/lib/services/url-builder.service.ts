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

  build(apiSuffix: string = '', key: BusKey = {}, routeParams: BusMessageParams = {}, urlParams: Record<string, string> = {}): string {
    const urlSegments =  apiSuffix.split('/').map(part => {
      if (part[0] === ':') {
        const keyName = part.substring(1);
        return ((key[keyName] === '?') ? routeParams[keyName] : key[keyName]) || '';
      }
      return part;
    }).filter(value => !!value);



    const urlMappedParams = Object.keys(urlParams).map(paramName => {
      if (urlParams[paramName] === '?') {
        return key[paramName] ? `${paramName}=${key[paramName]}` : '';
      }
      return `${paramName}=${urlParams[paramName]}`;
    }).filter(value => value !== '');
    const urlResultParams = urlMappedParams.length ? `?${urlMappedParams.join('&')}` : '';
    return `${this.options.apiRoot}${urlSegments.join('/')}${urlResultParams}`;  
  }
}
