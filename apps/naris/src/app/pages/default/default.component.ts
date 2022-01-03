import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BusError, MixedBusService } from '@soer/mixed-bus';
import { NzSiderComponent } from 'ng-zorro-antd/layout';
import { NzMessageService } from 'ng-zorro-antd/message';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../api/auth/auth.service';
import { MAIN_MENU } from './menu.const';

@Component({
  selector: 'soer-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  title = '';
  subtitle = '';
  subscriptions: any;
  isShowOverlay = true;

  menuItems = MAIN_MENU;

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private bus$: MixedBusService,
              private message: NzMessageService
              ) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(this.findTitle.bind(this)),
      this.bus$.of(BusError).subscribe(errorMessage => {
        if (errorMessage instanceof BusError) {
          errorMessage.errors.forEach(msg => this.message.error(msg));
        }
      })
    ];
    this.findTitle();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( (sub: any) => sub.unsubscribe());
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  findTitle(): void {
    const findChildActiveRoute = (nextChild: ActivatedRoute): ActivatedRoute => {
      if (nextChild.children.length > 0) {
          const filteredChildren = nextChild.children
                                   .filter(childTmp => childTmp.outlet === 'primary');
          for ( const childTmp of filteredChildren) {
            return findChildActiveRoute(childTmp);
          }
      }
      return nextChild;
    };

    const child = findChildActiveRoute(this.route);

    const data = child.snapshot.data;
    this.title = (data['header'] || {}).title;
    this.subtitle = (data['header'] || {}).subtitle;
  }

  check(sider: NzSiderComponent): void {
    if (sider.matchBreakPoint) {
      sider.setCollapsed(true);
    }
  }

  showOverlay(status: any): void {
    this.isShowOverlay = status;
  }

  onClose(): void {
    console.log('CLOSE!!!');
    
  }
}