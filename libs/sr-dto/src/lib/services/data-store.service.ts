import { Injectable } from '@angular/core';
import { BusError, BusMessage, BusOwner, MixedBusService } from '@soer/mixed-bus';
import { BehaviorSubject } from 'rxjs';
import { ChangeDataEvent } from '../bus-messages/bus.messages';
import { INIT } from '../interfaces/dto.pack.interface';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  data$ = new Map();
  constructor(private bus$: MixedBusService) { 
    console.log('Start datastore service...');
    this.bus$.of(ChangeDataEvent).subscribe(this.dataEmission.bind(this));
  }

  of(owner: BusOwner): BehaviorSubject<BusMessage> {
    if (!this.data$.has(owner.sid)) {
      this.data$.set(owner.sid, new BehaviorSubject<BusMessage>({owner, result: {status: INIT, items: []}, params: {}}));
    }
    return this.data$.get(owner.sid);
  }

  dataEmission(data: BusMessage | BusError): void {
    console.log('Update DataStore ==>>', data.owner, data);
    if (data instanceof ChangeDataEvent) {
        this.of(data.owner).next(data);
    }
  }


}
