import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MixedBusService } from '@soer/mixed-bus';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ComposePage } from '../compose-page';

interface IconTab {
  title: string;
  icon: string; path: string[];
  componentName?: string;
}

@Component({
  selector: 'soer-compose-icontabs-page',
  templateUrl: './compose-icontabs-page.component.html',
  styleUrls: ['./compose-icontabs-page.component.scss'],
})
export class ComposeIcontabsPageComponent extends ComposePage implements OnInit, OnDestroy {

  public active: IconTab = {
    title: '',
    icon: '',
    path: []
  };
  public tabs: IconTab[] = [];
  constructor( 
               bus$: MixedBusService,
               router: Router,
               route: ActivatedRoute,
               message: NzMessageService
  ) {
    super(bus$, router, route, message);
  }

  ngOnInit(): void {
    this.composeInit();
    this.prepareTabs();
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
              path: [newPath]
            };

            if (this.tabs.length === 0 || newPath === '.') {
              this.active = tab;
            }
            
            this.tabs.push(tab);
          }
        }
      });
  }

  activateTab(data: any): void {
    this.active = this.tabs.find(tab => tab.componentName && tab.componentName === data.constructor?.name) || {
      title: '',
      icon: '',
      path: []
    }
  }

}
