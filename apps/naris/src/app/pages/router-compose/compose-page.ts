import { ActivatedRoute, Router } from '@angular/router';
import { BusError, BusMessage, BusEmitter, isBusMessage, MixedBusService } from '@soer/mixed-bus';
import { CommandCancel, CommandEdit, CommandNew, CommandView, CreateDoneEvent, DeleteDoneEvent, ERROR, HookService, OK, UpdateDoneEvent } from '@soer/sr-dto';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';



export abstract class ComposePage {
    protected subscriptions: Subscription[] = [];
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
        this.bus$
          .of(DeleteDoneEvent).subscribe(evtResult => this.showMessageOrErrors('Элемент успешно удален', evtResult)),
        this.bus$.of(CreateDoneEvent).subscribe(evtResult => this.showMessageOrErrors('Элемент успешно создан', evtResult)),
        this.bus$.of(UpdateDoneEvent).subscribe(evtResult => this.showMessageOrErrors('Элемент успешно изменен', evtResult))
      ];

      const pathDomain = (this.route.snapshot.routeConfig?.path || '').split('/').shift();
      const watchDomain = this.domain.find(d => d.domainName === pathDomain);
      if (!watchDomain) {
        this.message.error('Неверно настроена конфигурация Router-а');
        console.error('You should specify "bus: {list, single}" param in router resolve');
      } else {
        this.register(watchDomain.hooks ?? []);
      }
    }


    showMessageOrErrors(msg: string, data: BusMessage | BusError): void {

      if (isBusMessage(data)){
        if (data.payload.status === OK) {
          this.message.success(msg);
        } else if(data.payload.status === ERROR) {
          this.message.error('Что-то пошло не так...');
        }
      }
    }

    

    register(hooks: BusEmitter[]): void {
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

    onCRUDDone(data: BusMessage | BusError): void {
      if (data instanceof BusError) { return; }
        if (data.params?.['skipRoute']) {
            return;
        }
        this.router.navigate([{outlets: {popup: null}}], { relativeTo: this.route });
    }

    onNewWorkbook(): void {
      this.router.navigate(['new'], { relativeTo: this.route });
    }
    onEditWorkbook(data: BusMessage | BusError): void {
      if (data instanceof BusError) { return; }
      this.router.navigate(['edit', data.payload.id], { relativeTo: this.route });
    }

    onViewWorkbook(data: BusMessage | BusError): void {
      if (data instanceof BusError) { return; }
      this.router.navigate(['view', data.payload.id], { relativeTo: this.route });
    }

    closePopup(): void {
      this.router.navigate([{outlets: {popup: null}}], { relativeTo: this.route });
    }

    showPopup(action: boolean): void {
      this.popup = action;
    }
  }
