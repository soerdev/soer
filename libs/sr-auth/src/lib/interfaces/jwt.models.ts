export interface JWTModel {
    id: number;
    email: string;
    role: string;
    expired?: Date;
    namespaces?: any[];
    iat: number;
    exp: number;
  }


export const EmptyJWTModel: JWTModel = {
  id: -1,
  email: '',
  role: 'GUEST',
  iat: 0,
  exp: 0
}