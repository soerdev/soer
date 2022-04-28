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

  private dataTree$ = new Map();
  constructor(private bus$: MixedBusService) { 
    console.log('Start datastore service...');
    this.bus$.of(ChangeDataEvent).subscribe(this.dataEmission.bind(this));
  }

  of(owner: BusEmitter): BehaviorSubject<BusMessage> {
    if (!this.dataTree$.has(owner.sid)) {
      this.dataTree$.set(owner.sid, new Map());
    }
    const schemaMap = this.dataTree$.get(owner.sid);

    const schemaName = JSON.stringify(owner.schema);
    if (!schemaMap.has(schemaName)) {
      schemaMap.set(schemaName, new Map());
    }

    const keyData = schemaMap.get(schemaName);
    const key = JSON.stringify(owner.key);
    if (!keyData.has(key)) {
      keyData.set(key, new BehaviorSubject<BusMessage>({owner, payload: {status: INIT, items: []}, params: {}}));
    }
    return keyData.get(key);
  }

  dataEmission(data: BusMessage | BusError): void {
    console.log('Update DataStore ==>>', data.owner, data);
    if (data instanceof ChangeDataEvent) {
        this.of(data.owner).next(data);
    }
  }


}