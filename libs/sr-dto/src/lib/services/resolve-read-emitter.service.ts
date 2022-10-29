import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ANT_ICON_ANGULAR_CONSOLE_PREFIX } from '@ant-design/icons-angular';
import { busEmitterFactory, MixedBusService } from '@soer/mixed-bus';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { ChangeDataEvent, CommandRead } from '../bus-messages/bus.messages';
import { CRUDBusEmitter } from '../sr-dto.module';

export class ResolveReadEmitterService implements Resolve<any> {

  constructor(private bus$: MixedBusService, private owner: CRUDBusEmitter) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    const owner = busEmitterFactory(this.owner, route.params);
    const wnd = (window as any);
    wnd.resolvedEmitters = wnd.resolvedEmitters || {};
    wnd.resolvedEmitters[owner.sid.toString()] = owner;
    this.bus$.publish(new CommandRead(owner));
    //TODO: refactor toPromise to firstValueOf
    return of(owner).toPromise();
  }
}
``