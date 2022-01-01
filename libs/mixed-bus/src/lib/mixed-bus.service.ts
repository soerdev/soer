import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BusError, BusMessage, BusOwner, IBus } from '@soer/mixed-bus';

/**
 * Шина для обмена сообщениями
 * использует сообщения типа BusMessage:
 *  - BusCommand используется для распространения управляющих команд
 *  - BusEvent используется для информирования о стадии выполнения команды
 * 
 * События и команды должны быть расширены в модулях, использующих MixedBus
 * ```
 *   export class DeleteStartEvent extends BusEvent {}
 *   export class DeleteDoneEvent extends BusEvent {}
 *   export class CommandNew extends BusCommand {}
 * ```
 */
@Injectable(
    {providedIn: 'root'}
)
export class MixedBusService {
    public bus$: Subject<IBus>;

    constructor(){
        console.log('Mixed bus system start');
        this.bus$ = new Subject<IBus>();
    }

    /**
     * Публикует BusMessage в шине
     * @param message  - BusMessage
     */
    public publish<T extends Record<string, unknown>>(message: BusMessage|BusError): void {
        console.log('Publish =>', message.owner, message);
        const channel = (message.constructor as any).name;
        this.bus$.next({ channel, message });
    }


    /**
     * Подписка на все события и команды шины
     * @returns Observable<IBus>
     */
    public all(): Observable<IBus> {
        return this.bus$;
    }

    /**
     * Выделение специфического сообщения из шины,
     * с возможностью фильтрации по владельцам сообщения
     * @param messageType <T>
     * @param eventOwners BusOwner[]
     * @returns 
     */
    public of(messageType: unknown, eventOwners: BusOwner[] = []): Observable<BusMessage|BusError> {
        const channel = (messageType as any).name;
        return this.bus$.pipe(
            filter(m => m != null && m.channel === channel),
            filter(m => eventOwners?.length > 0 ? eventOwners.map(o => o.sid).includes(m.message.owner.sid) : true),
            map<IBus, BusMessage|BusError>(m => m.message));
    }
}
