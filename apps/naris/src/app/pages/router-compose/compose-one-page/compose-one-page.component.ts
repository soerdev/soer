import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MixedBusService } from '@soer/mixed-bus';
import { HookService } from '@soer/sr-dto';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ComposePage } from '../compose-page';

@Component({
  selector: 'soer-compose-one-page',
  templateUrl: './compose-one-page.component.html',
  styleUrls: ['./compose-one-page.component.scss']
})
export class ComposeOnePageComponent extends ComposePage implements OnInit, OnDestroy {

  constructor(
    @Inject('HookDomain') domain: HookService[],
    bus$: MixedBusService,
    router: Router,
    route: ActivatedRoute,
    message: NzMessageService
  ) {
    super(domain, bus$, router, route, message);
  }

  ngOnInit(): void {
      this.composeInit();
  }

  ngOnDestroy(): void {
      this.composeDestroy();
  }
}
