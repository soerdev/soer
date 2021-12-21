import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { first } from 'rxjs/operators';
import { BusOwner } from '../../mixed-bus/interfaces/mixed-bus.interface';
import { MixedBusService } from '../../mixed-bus/mixed-bus.service';
import { ChangeDataEvent, CommandRead } from '../bus-messages/bus.messages';

@Injectable()
export class ResolveReadEmitterService implements Resolve<any> {

  constructor(private bus$: MixedBusService, private owner: BusOwner) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    this.bus$.publish(new CommandRead(this.owner, {}, route.params));
    //TODO: refactor toPromise to firstValueOf
    return this.bus$.of(ChangeDataEvent, [this.owner]).pipe(first()).toPromise();
  }
}
