import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusEmitter, BusError, BusMessage, MixedBusService } from '@soer/mixed-bus';
import { UrlBuilderService } from '@soer/sr-url-builder';
import { isObservable, Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { ChangeDataEvent, CommandCreate, CommandDelete, CommandNew, CommandRead, CommandUpdate, CreateDoneEvent, DeleteDoneEvent, ErrorDataEvent, ReadDoneEvent, UpdateDoneEvent } from '../bus-messages/bus.messages';
import { isCRUDBusEmitter } from '../dto.helpers';
import { CRUD } from '../interfaces/crud.interface';
import { DtoPack, ERROR, INIT, OK } from '../interfaces/dto.pack.interface';
import { CRUDBusEmitter } from '../sr-dto.module';

@Injectable(
    { providedIn: 'root' }
)
export class StoreCrudService implements CRUD {

    constructor(
        private http: HttpClient,
        private bus$: MixedBusService,
        private urlBuilder: UrlBuilderService
    ) {
        console.log('Start RESTfull CRUD events service');
        bus$.of(CommandNew).subscribe(this.createNew.bind(this));
        bus$.of(CommandRead).subscribe(this.read.bind(this));
        bus$.of(CommandCreate).subscribe(this.create.bind(this));
        bus$.of(CommandUpdate).subscribe(this.update.bind(this));
        bus$.of(CommandDelete).subscribe(this.delete.bind(this));
    }

    // New
    createNew(msg: BusMessage|BusError): void {
        this.updateData({ status: INIT, items: [] }, msg.owner);
    }
    // Create
    protected queryRead(owner: CRUDBusEmitter, routeParams: any): Observable<DtoPack<any>> {
        return this.http.get<DtoPack<any>>(this.urlBuilder.build(owner.schema['url'], owner.key, routeParams, owner.schema['params']));
    }

    public read(msg: BusMessage|BusError): Promise<DtoPack<any>> {
        if (msg instanceof BusError || !isCRUDBusEmitter(msg.owner)) {
            return Promise.resolve({status: ERROR, items: []});
        }
        
        return this.updateData(this.queryRead(msg.owner, msg.params)
            .pipe(
                tap((data) => this.bus$.publish(new ReadDoneEvent(msg.owner, data, msg.params)))
            ), msg.owner
        );
    }

    // Create
    protected queryCreate(data: any, owner: CRUDBusEmitter, routeParams: any): Observable<DtoPack<any>> {
        return this.http.post<DtoPack<any>>(this.urlBuilder.build(owner.schema['url'], owner.key, routeParams, owner.schema['params']), data);
    }

    public create(msg: BusMessage | BusError): Promise<DtoPack<any>> {
        if (msg instanceof BusError || !isCRUDBusEmitter(msg.owner)) {
            return Promise.resolve({status: ERROR, items: []});
        }
        return this.updateData(this.queryCreate(msg.payload, msg.owner, msg.params)
            .pipe(
                tap((data) => this.bus$.publish(new CreateDoneEvent(msg.owner, data, msg.params)))
            ), msg.owner
        );
    }

    // UPDATE
    protected queryUpdate(data: any, owner: CRUDBusEmitter, routeParams: any): Observable<DtoPack<any>> {
        return this.http.put<DtoPack<any>>(this.urlBuilder.build(owner.schema['url'], owner.key, routeParams, owner.schema['params']), data);
    }

    public update(msg: BusMessage | BusError): Promise<DtoPack<any>> {
        if (msg instanceof BusError || !isCRUDBusEmitter(msg.owner)) {
            return Promise.resolve({status: ERROR, items: []});
        }

        return this.updateData(this.queryUpdate(msg.payload, msg.owner, msg.params)
            .pipe(
                tap((data) => this.bus$.publish(new UpdateDoneEvent(msg.owner, data, msg.params)))
            ), msg.owner
        );
    }

    // DELETE
    protected queryDelete(owner: CRUDBusEmitter, routeParams: any): Observable<DtoPack<any>> {
        return this.http.delete<DtoPack<any>>(this.urlBuilder.build(owner.schema['url'], owner.key, routeParams, owner.schema['params']));
    }

    public delete(msg: BusMessage | BusError): Promise<DtoPack<any>> {
        if (msg instanceof BusError || !isCRUDBusEmitter(msg.owner)) {
            return Promise.resolve({status: ERROR, items: []});
        }

        return this.updateData(this.queryDelete(msg.owner, msg.params)
            .pipe(
                tap((data) => this.bus$.publish(new DeleteDoneEvent(msg.owner, data, msg.params)))
            ), msg.owner
        );
    }

    async updateData(
        dataOrObservable: DtoPack<any> | Observable<DtoPack<any>> | undefined,
        id: BusEmitter
    ): Promise<DtoPack<any>> {
        if (isObservable(dataOrObservable)) {
            try {
                dataOrObservable = await dataOrObservable.pipe(first()).toPromise();
            } catch (e: unknown) {
                if (e instanceof Error) {
                    dataOrObservable = {status: ERROR, items: [{message: e.message}]};
                } else {
                    dataOrObservable = {status: ERROR, items: [{message: 'Unknown error'}]};
                }
            }
        }

        if (dataOrObservable === undefined) {
            dataOrObservable = {status: ERROR, items: []};
        }

        const status = dataOrObservable?.status ?? OK;
        const items = dataOrObservable?.items ?? [];

        if (status === OK) {
            this.bus$.publish(new ChangeDataEvent(id, { status, items }));
        } else if (status === ERROR) {
            this.bus$.publish(new ErrorDataEvent(id, { status, items }));
        }
        return dataOrObservable;
    }
}
