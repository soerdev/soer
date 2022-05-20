import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BusEmitter, BusError, MixedBusService } from '@soer/mixed-bus';
import { AuthService, JWTModel } from '@soer/sr-auth';
import { DataStoreService, DtoPack, extractDtoPackFromBus, OK } from '@soer/sr-dto';
import { NzBreakpointService, siderResponsiveMap } from 'ng-zorro-antd/core/services';
import { NzSiderComponent } from 'ng-zorro-antd/layout';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MAIN_MENU } from './menu.const';


@Component({
  selector: 'soer-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  isMobileView = false;
  title = '';
  subtitle = '';
  subscriptions: Subscription[] = [];
  isShowOverlay = true;

  public user: Observable<DtoPack<JWTModel>>;
  public helpUs$: Observable<any>;
  menuItems = MAIN_MENU;

  constructor(
              @Inject('manifest') private manifestId: BusEmitter,
              @Inject('issues') private issuesId: BusEmitter,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private bus$: MixedBusService,
              private store$: DataStoreService,
              private message: NzMessageService,
              private breakpointService: NzBreakpointService
              ) {
    this.user = extractDtoPackFromBus<JWTModel>(this.store$.of(this.manifestId));
    this.helpUs$ = this.store$.of(this.issuesId).pipe(map(data => {
      if (data.payload?.status === OK) {
        return data.payload.items.map((item: any) => {
          const {body, html_url} = item;
          return {body, html_url};
        });
      }
      return data;
    }));
  }

  ngOnInit(): void {
    this.subscriptions = [
      this.breakpointService.subscribe(siderResponsiveMap).subscribe(size => {
        this.isMobileView = ['xs', 'sm', 'md', 'lg'].includes(size);
      }),
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
