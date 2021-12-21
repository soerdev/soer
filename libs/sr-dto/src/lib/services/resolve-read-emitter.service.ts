import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BusOwner, MixedBusService } from '@soer/mixed-bus';
import { first } from 'rxjs/operators';
import { ChangeDataEvent, CommandRead } from '../bus-messages/bus.messages';

export class ResolveReadEmitterService implements Resolve<any> {

  constructor(private bus$: MixedBusService, private owner: BusOwner) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    this.bus$.publish(new CommandRead(this.owner, {}, route.params));
    //TODO: refactor toPromise to firstValueOf
    return this.bus$.of(ChangeDataEvent, [this.owner]).pipe(first()).toPromise();
  }
}
