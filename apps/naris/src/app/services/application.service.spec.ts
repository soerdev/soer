import { TestBed, waitForAsync } from '@angular/core/testing';
import { ANY_SERVICE } from '@soer/mixed-bus';
import { AuthService } from '@soer/sr-auth';
import { DataStoreService } from '@soer/sr-dto';

import { ApplicationService } from './application.service';
import { MAIN_MENU } from './menu/menu.const';
import { MenuControl } from './menu/MenuControl.class';

describe('ApplicationService', () => {
  let service: ApplicationService;
  const someTestControl: MenuControl = new MenuControl(
    'title1',
    'icon1',
    () => {
      // empty
    }
  );

  const anotherTestControl = new MenuControl(
    'title2',
    'icon2',
    () => {
      // empty
    }
  )

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService, useValue: {
            logout: () => { 
              // empty
            }
          }
        },
        DataStoreService,
        { provide: 'manifest', useValue: ANY_SERVICE }
      ]
    });
    service = TestBed.inject(ApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain store$, user$, control$, mainMenu', () => {
    expect(service.user).toBeTruthy();
    expect(service.store$).toBeTruthy();
    expect(service.user$).toBeTruthy();
    expect(service.auth).toBeTruthy();
    expect(service.mainMenu).toBeTruthy();
    expect(service.control$).toBeTruthy();
  })

  it('should have menu$ porperty', waitForAsync(() => {
    service.pageControls([someTestControl, anotherTestControl]);

    service.control$.subscribe(menu => {
      console.log(menu);
      expect(menu).toEqual([someTestControl, anotherTestControl]);
    })
  }))
});
