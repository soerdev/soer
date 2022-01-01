import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommandCancel, CommandEdit,
         CommandNew,
         CommandView,
         CreateDoneEvent,
         DeleteDoneEvent,
         UpdateDoneEvent } from '../../packages/dto/bus-messages/bus.messages';
import { HookService } from '../../packages/dto/services/hook.service';
import { BusMessage, BusOwner } from '../../packages/mixed-bus/interfaces/mixed-bus.interface';
import { MixedBusService } from '../../packages/mixed-bus/mixed-bus.service';


export abstract class ComposePage {
    protected subscriptions = [];
    public popup = false;

    render = () => console.log(Math.random());


    constructor(
        protected domain: HookService[],
        protected bus$: MixedBusService,
        protected router: Router,
        protected route: ActivatedRoute,
        protected message: NzMessageService
    ) { }

    composeInit(): void {
      this.subscriptions = [
        this.bus$.of(DeleteDoneEvent).subscribe(() => this.message.success('Элемент успешно удален')),
        this.bus$.of(CreateDoneEvent).subscribe(() => this.message.success('Элемент успешно создан')),
        this.bus$.of(UpdateDoneEvent).subscribe(() => this.message.success('Элемент успешно изменен'))
      ];

      const pathDomain = this.route.snapshot.routeConfig.path.split('/').shift();
      const watchDomain = this.domain.find(d => d.domainName === pathDomain);

      if (!watchDomain) {
        this.message.error('Неверно настроена конфигурация Router-а');
        console.error('You should specify "bus: {list, single}" param in router resolve');
      } else {
        this.register(watchDomain.hooks ?? []);
      }
    }

    register(hooks: BusOwner[]): void {
      if (hooks.length > 0) {
        this.subscriptions = [...this.subscriptions,
          this.bus$.of(CreateDoneEvent, hooks).subscribe(this.onCRUDDone.bind(this)),
          this.bus$.of(DeleteDoneEvent, hooks).subscribe(this.onCRUDDone.bind(this)),
          this.bus$.of(UpdateDoneEvent, hooks).subscribe(this.onCRUDDone.bind(this)),
          this.bus$.of(CommandCancel, hooks).subscribe(this.onCRUDDone.bind(this)),
          this.bus$.of(CommandNew, hooks).subscribe(this.onNewWorkbook.bind(this)),
          this.bus$.of(CommandEdit, hooks).subscribe(this.onEditWorkbook.bind(this)),
          this.bus$.of(CommandView, hooks).subscribe(this.onViewWorkbook.bind(this))
        ];
      }
    }

    composeDestroy(): void {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    onCRUDDone(data: BusMessage): void {
        if (data.params?.skipRoute) {
            return;
        }
        this.router.navigate([{outlets: {popup: null}}], { relativeTo: this.route });
    }

    onNewWorkbook(): void {
      this.router.navigate(['new'], { relativeTo: this.route });
    }
    onEditWorkbook(data: BusMessage): void {
      this.router.navigate(['edit', data.result.id], { relativeTo: this.route });
    }

    onViewWorkbook(data: BusMessage): void {
      this.router.navigate(['view', data.result.id], { relativeTo: this.route });
    }

    closePopup(): void {
      this.router.navigate([{outlets: {popup: null}}], { relativeTo: this.route });
    }

    showPopup(action: boolean): void {
      this.popup = action;
    }
  }
