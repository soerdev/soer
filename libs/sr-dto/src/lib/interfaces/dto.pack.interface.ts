export const OK = 'ok';
export const ERROR = 'error';
export const LOADING = 'loading';
export const UPDATE = 'update';
export const INIT = 'init';

export type DtoStatus = typeof INIT | typeof OK | typeof ERROR | typeof LOADING | typeof UPDATE;

export interface DtoPack<T> {
    status: DtoStatus;
    items: T[];
}

