import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MixedBusService } from '@soer/mixed-bus';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject } from 'rxjs';
import { ComposePage } from '../compose-page';

interface IconTab {
  title: string;
  icon?: string; path: string[];
  iconText?: string;
  componentName?: string;
}

@Component({
  selector: 'soer-compose-icontabs-page',
  templateUrl: './compose-icontabs-page.component.html',
  styleUrls: ['./compose-icontabs-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComposeIcontabsPageComponent extends ComposePage implements OnInit, OnDestroy {

  public active$: BehaviorSubject<IconTab | null> = new BehaviorSubject<IconTab | null>(null);
  public tabs: IconTab[] = [];
  constructor( 
               bus$: MixedBusService,
               router: Router,
               route: ActivatedRoute,
               message: NzMessageService,
               cdp: ChangeDetectorRef
  ) {
    super(bus$, router, route, message, cdp);
    this.prepareTabs();
  }

  ngOnInit(): void {
    this.composeInit();

  }

  ngOnDestroy(): void {
      this.composeDestroy();
  }


  prepareTabs(): void {
      this.route.routeConfig?.children?.forEach( child => {
        if (child.data?.['header']) {
          const newPath = (child.path === undefined || child.path === '') ? '.' : child.path;
          if (!(child.data?.['header']?.['cantBeTab'])) {
            const tab: IconTab = {
              componentName: child.component?.name,
              title: child.data?.['header'].title,
              icon: child.data?.['header'].icon,
              iconText: child.data?.['header'].iconText || '',
              path: [newPath]
            };
            this.tabs.push(tab);
          }
        }
      });
  }

  activateTab(data: any): void {

    const findActiveTitle = (r: ActivatedRoute): string[]  => {

      let result: string[] = [];
      if (r.snapshot.routeConfig?.path) {
        result.push(r.snapshot.routeConfig?.path )
      }
      if (r.children.length > 0) {
        for(let i = 0; i < r.children.length; i++) {
          const childTitles = findActiveTitle(r.children[i]);
          result = [...result, ...childTitles];
        }
      }
      return result;
    }

    const [activeRoute] = this.route.children;
    const path =  findActiveTitle(this.route).pop() || '';

    if (activeRoute) {
      const activeTab = this.tabs.find(tab => tab.path && tab.path.includes(path)) || {
        title: '',
        icon: '',
        path: []
      };
      setTimeout(() => this.active$.next(activeTab), 0);
    }

  }

}
