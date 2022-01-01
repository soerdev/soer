import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommandEdit,
         CommandNew,
         CommandView,
         CreateDoneEvent,
         DeleteDoneEvent,
         UpdateDoneEvent } from '../../../packages/dto/bus-messages/bus.messages';
import { HookService } from '../../../packages/dto/services/hook.service';
import { BusMessage, BusOwner } from '../../../packages/mixed-bus/interfaces/mixed-bus.interface';
import { MixedBusService } from '../../../packages/mixed-bus/mixed-bus.service';
import { ComposePage } from '../compose-page';

@Component({
  selector: 'app-compose-one-page',
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
