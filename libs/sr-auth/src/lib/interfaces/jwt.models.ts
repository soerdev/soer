export interface JWTModel {
    id: number;
    email: string;
    role: string;
    iat: number;
    exp: number;
  }