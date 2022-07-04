import { TestBed, waitForAsync } from '@angular/core/testing';

import { ApplicationService } from './application.service';
import { MAIN_MENU } from './menu/menu.const';
import { MenuControl } from './menu/MenuControl.class';

describe('ApplicationService', () => {
  let service: ApplicationService;
  const someTestControl: MenuControl = new MenuControl(
    'title1',
    'icon1'
  );

  const anotherTestControl = new MenuControl(
    'title2',
    'icon2'
  )
 
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have menu$ porperty', waitForAsync(() => {
    service.pageControls([someTestControl, anotherTestControl]);

    service.menu$.subscribe(menu => {
      console.log(menu);
      expect(menu).toEqual([MAIN_MENU, someTestControl, anotherTestControl]);
    })
  }))
});
