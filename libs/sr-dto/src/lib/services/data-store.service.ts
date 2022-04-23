/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { BusError, BusMessage, BusEmitter, MixedBusService } from '@soer/mixed-bus';
import { BehaviorSubject } from 'rxjs';
import { ChangeDataEvent } from '../bus-messages/bus.messages';
import { INIT } from '@soer/sr-dto';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  data$ = new Map();
  constructor(private bus$: MixedBusService) { 
    console.log('Start datastore service...');
    this.bus$.of(ChangeDataEvent).subscribe(this.dataEmission.bind(this));
  }

  of(owner: BusEmitter): BehaviorSubject<BusMessage> {
    if (!this.data$.has(owner)) {
      this.data$.set(owner, new BehaviorSubject<BusMessage>({owner, payload: {status: INIT, items: []}, params: {}}));
    }
    return this.data$.get(owner);
  }

  dataEmission(data: BusMessage | BusError): void {
    console.log('Update DataStore ==>>', data.owner, data);
    if (data instanceof ChangeDataEvent) {
        this.of(data.owner).next(data);
    }
  }


}
