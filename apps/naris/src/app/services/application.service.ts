import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MAIN_MENU } from './menu/menu.const';
import { ApplicationMenu } from './menu/menu.interfaces';
import { MenuControl } from './menu/MenuControl.class';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  public menu$ = new BehaviorSubject<ApplicationMenu>([MAIN_MENU]);


  public pageControls(controls: MenuControl[]): void {
    const menu: ApplicationMenu = [MAIN_MENU];
    controls.forEach((item) => menu.push(item));
    this.menu$.next(menu);
  }
}
