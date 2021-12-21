import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusMessage, BusOwner, MixedBusService } from '@soer/mixed-bus';
import { isObservable, Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { ChangeDataEvent, CommandCreate, CommandDelete, CommandNew, CommandRead, CommandUpdate, CreateDoneEvent, DeleteDoneEvent, ErrorDataEvent, ReadDoneEvent, UpdateDoneEvent } from '../bus-messages/bus.messages';
import { CRUD } from '../interfaces/crud.interface';
import { DtoPack, ERROR, INIT, OK } from '../interfaces/dto.pack.interface';


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
    createNew(msg: BusMessage): void {
        this.updateData({ status: INIT, items: [] }, msg.owner);
    }
    // Create
    protected queryRead(owner: BusOwner, params): Observable<DtoPack<any>> {
        return this.http.get<DtoPack<any>>(this.urlBuilder.build(owner.schema.read, params));
    }

    public read(msg: BusMessage): Promise<DtoPack<any>> {
        return this.updateData(this.queryRead(msg.owner, msg.params)
            .pipe(
                tap((data) => this.bus$.publish(new ReadDoneEvent(msg.owner, data, msg.params)))
            ), msg.owner
        );
    }

    // Create
    protected queryCreate(data: any, owner: BusOwner, params): Observable<DtoPack<any>> {
        return this.http.post<DtoPack<any>>(this.urlBuilder.build(owner.schema.create, params), data);
    }

    public create(msg: BusMessage): Promise<DtoPack<any>> {
        return this.updateData(this.queryCreate(msg.result, msg.owner, msg.params)
            .pipe(
                tap((data) => this.bus$.publish(new CreateDoneEvent(msg.owner, data)))
            ), msg.owner
        );
    }

    // UPDATE
    protected queryUpdate(data: any, owner: BusOwner, params): Observable<DtoPack<any>> {
        return this.http.put<DtoPack<any>>(this.urlBuilder.build(owner.schema.update, params), data);
    }

    public update(msg: BusMessage): Promise<DtoPack<any>> {
        return this.updateData(this.queryUpdate(msg.result, msg.owner, msg.params)
            .pipe(
                tap((data) => this.bus$.publish(new UpdateDoneEvent(msg.owner, data, msg.params)))
            ), msg.owner
        );
    }

    // DELETE
    protected queryDelete(owner: BusOwner, params): Observable<DtoPack<any>> {
        return this.http.delete<DtoPack<any>>(this.urlBuilder.build(owner.schema.delete, params));
    }

    public delete(msg: BusMessage): Promise<DtoPack<any>> {
        return this.updateData(this.queryDelete(msg.owner, msg.params)
            .pipe(
                tap((data) => this.bus$.publish(new DeleteDoneEvent(msg.owner, data, msg.params)))
            ), msg.owner
        );
    }

    async updateData(
        dataOrObservable: DtoPack<any> | Observable<DtoPack<any>>,
        id: BusOwner
    ): Promise<DtoPack<any>> {
        if (isObservable(dataOrObservable)) {
            try {
                dataOrObservable = await dataOrObservable.pipe(first()).toPromise();
            } catch (e) {
                dataOrObservable = {status: ERROR, items: [{message: e.message}]};
            }
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
