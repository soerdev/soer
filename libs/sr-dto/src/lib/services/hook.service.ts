import { BusError, BusMessage, BusOwner, MixedBusService } from '@soer/mixed-bus';
import { CommandRead, CreateDoneEvent, DeleteDoneEvent, UpdateDoneEvent } from '../bus-messages/bus.messages';


export class HookService {

  constructor(public domainName: string = '', private bus$: MixedBusService, public hooks: BusOwner[]) { 
    console.log('Start hook service', hooks);
    this.bus$.of(DeleteDoneEvent).subscribe(this.watch.bind(this));
    this.bus$.of(UpdateDoneEvent).subscribe(this.watch.bind(this));
    this.bus$.of(CreateDoneEvent).subscribe(this.watch.bind(this));
  }

  watch(data$: BusMessage | BusError): void {
    const domain = this.hooks.filter(h => h.sid !== data$.owner.sid);
    if (domain.length != this.hooks.length) {
      domain.forEach(h => this.bus$.publish(new CommandRead(h)));
    }
  }
}
