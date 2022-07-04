import { Inject, Injectable } from '@angular/core';
import { BusEmitter } from '@soer/mixed-bus';
import { AuthService, JWTModel } from '@soer/sr-auth';
import { DataStoreService, extractDtoPackFromBus } from '@soer/sr-dto';
import { DtoPack } from 'libs/sr-dto/src/lib/interfaces/dto.pack.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserModel } from './application.models';
import { MAIN_MENU } from './menu/menu.const';
import { ApplicationMenu, IMenuControl } from './menu/menu.interfaces';
import { MenuControl } from './menu/MenuControl.class';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  public control$ = new BehaviorSubject<IMenuControl[]>([]);
  public mainMenu = MAIN_MENU;

  public user: UserModel = {id: -1, role: 'guest', email: ''};
  public user$: Observable<DtoPack<JWTModel>>;

  constructor(
    @Inject('manifest') private manifestId: BusEmitter,
    public auth: AuthService,
    public store$: DataStoreService,
  ) {
    this.user$ = extractDtoPackFromBus<JWTModel>(this.store$.of(this.manifestId)).pipe(
      tap(dtoPack => {
        const [jwtModel] = dtoPack.items;
        if (jwtModel) {
          this.user.id = jwtModel.id;
          this.user.email = jwtModel.email;
          this.user.role = jwtModel.role;
        }
      })
    );
  }

  public pageControls(controls: MenuControl[]): void {
    this.control$.next(controls);
  }
}
