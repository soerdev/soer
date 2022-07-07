// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentInterface } from './environment.interface';

const HOST = 'http://localhost:4000';

export const environment: EnvironmentInterface = {
  production: false,
  host: HOST,
  googleAuthUrl: HOST + '/api/auth/google',
  patreonAuthUrl: HOST + '/api/auth/patreon',
  yandexAuthUrl: HOST + '/api/auth/yandex',
  apiUrl: HOST + '/api/',
  assetsUrl: HOST + '/assets/',
  privateAssetsUrl: HOST + '/assets/private/',
  payServiceUrl: HOST + '/api/v2/seller'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
