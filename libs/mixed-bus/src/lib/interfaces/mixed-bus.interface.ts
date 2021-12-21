export type BusOwner = {sid: symbol, schema: {[key: string]: any}};

export const ANY_SERVICE: BusOwner = {sid: Symbol('AnyService'), schema: {}};

/**
 *  EVENTS
 *  события используются для информирования о состоянии команды в начале,
 *  середине и конце выполнения
 */
export class BusEvent {
    constructor(public owner: BusOwner = ANY_SERVICE, public result: any = {}, public params: {[key: string]: any} = {}) {}
}

/**
 *   COMMANDS
 *   Команды используются для инициирования действия
 */
export class BusCommand {
    constructor(public owner: BusOwner = ANY_SERVICE, public result: any = {}, public params: {[key: string]: any} = {} ) {}
}

/**
 *   ERRORS
 *   Ошибки в процессе обработки событий
 */
export class BusError {
    constructor(public owner: BusOwner = ANY_SERVICE, public errors: string[] ) {}
}


export type BusMessage = BusCommand | BusEvent;

export interface IBus {
    channel: string;
    message: BusMessage | BusError;
}
