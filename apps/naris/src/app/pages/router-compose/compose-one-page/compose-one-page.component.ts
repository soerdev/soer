import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MixedBusService } from '@soer/mixed-bus';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ComposePage } from '../compose-page';

@Component({
  selector: 'soer-compose-one-page',
  templateUrl: './compose-one-page.component.html',
  styleUrls: ['./compose-one-page.component.scss']
})
export class ComposeOnePageComponent extends ComposePage implements OnInit, OnDestroy {

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
  }

  ngOnDestroy(): void {
      this.composeDestroy();
  }
}
