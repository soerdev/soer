import { EnvironmentInterface } from './environment.interface';

const HOST = 'https://platform.soer.pro';

export const environment: EnvironmentInterface = {
  production: true,
  host: HOST,
  googleAuthUrl: HOST + '/api/auth/google',
  patreonAuthUrl: HOST + '/api/auth/patreon',
  yandexAuthUrl: HOST + '/api/auth/yandex',
  apiUrl: HOST + '/api/',
  assetsUrl: HOST + '/assets/',
  privateAssetsUrl: HOST + '/assets/private/',
  payServiceUrl: HOST + '/api/seller/order/'
};
