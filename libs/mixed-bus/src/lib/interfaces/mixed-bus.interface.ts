
export type BusKey = {[key: string]: any};
export type BusKeys<T extends BusKey = BusKey> = {[key: string]: T};
export type BusMessageParams = {[param: string]: any};

export type BusEmitter<T = {[key: string]: any}> = {sid: symbol, schema: T, key?: BusKey};

export const ANY_SERVICE: BusEmitter = {sid: Symbol('AnyService'), schema: {}};

/**
 *  EVENTS
 *  события используются для информирования о состоянии команды в начале,
 *  середине и конце выполнения
 */
export class BusEvent {
    constructor(public owner: BusEmitter = ANY_SERVICE, public payload: any = {}, public params: BusMessageParams = {}) {}
}

/**
 *   COMMANDS
 *   Команды используются для инициирования действия
 */
export class BusCommand {
    constructor(public owner: BusEmitter = ANY_SERVICE, public payload: any = {}, public params: BusMessageParams = {} ) {}
}

/**
 *   ERRORS
 *   Ошибки в процессе обработки событий
 */
export class BusError {
    constructor(public owner: BusEmitter = ANY_SERVICE, public errors: string[] ) {}
}


export type BusMessage = BusCommand | BusEvent;

export interface IBus {
    channel: string;
    message: BusMessage | BusError;
}
