import { ActivatedRoute, Router } from '@angular/router';
import { BusEmitter, BusError, BusMessage, isBusMessage, MixedBusService } from '@soer/mixed-bus';
import { CommandCancel, CommandEdit, CommandNew, CommandRead, CommandView, CreateDoneEvent, DeleteDoneEvent, ERROR, OK, UpdateDoneEvent } from '@soer/sr-dto';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';



export abstract class ComposePage {
    protected subscriptions: Subscription[] = [];
    public popup = false;

    render = () => console.log(Math.random());


    constructor(
        protected bus$: MixedBusService,
        protected router: Router,
        protected route: ActivatedRoute,
        protected message: NzMessageService
    ) { }

    composeInit(): void {
      this.subscriptions = [
        this.bus$.of(DeleteDoneEvent).subscribe(evtResult => this.showMessageOrErrors('Элемент успешно удален', evtResult)),
        this.bus$.of(CreateDoneEvent).subscribe(evtResult => this.showMessageOrErrors('Элемент успешно создан', evtResult)),
        this.bus$.of(UpdateDoneEvent).subscribe(evtResult => this.showMessageOrErrors('Элемент успешно изменен', evtResult))
      ];

      this.register();
    }


    showMessageOrErrors(msg: string, data: BusMessage | BusError): void {
      
      const result: any[] = [];
      function extract(node: any): void {
          
          node.children.forEach( (child:any) => {
            Object.keys(child.snapshot.data).forEach(dataElement => {
              if (child.snapshot.data[dataElement].sid) {
                result.push(child.snapshot.data[dataElement])
              }
            });
            extract(child);
          })
      }
      extract(this.router.routerState.root);
      result.forEach(h => {
        
        const isSameSchema = function (a: BusEmitter, b: BusEmitter): boolean {
          const aStr = JSON.stringify(a.schema);
          const bStr = JSON.stringify(b.schema);
          return aStr === bStr;
        }
        if (h.sid === data.owner.sid) {
          this.bus$.publish(new CommandRead(h));
        }
      });

      if (isBusMessage(data)){
        if (data.payload.status === OK) {
          this.message.success(msg);
        } else if(data.payload.status === ERROR) {
          const errors = data.payload.items.join(' ');
          this.message.error(errors || 'Что-то пошло не так...');
        }
      }

      this.onCRUDDone(data);
    }

    

    register(): void {
        this.subscriptions = [...this.subscriptions,
//          this.bus$.of(CreateDoneEvent, hooks).subscribe(this.onCRUDDone.bind(this)),
//          this.bus$.of(DeleteDoneEvent, hooks).subscribe(this.onCRUDDone.bind(this)),
//          this.bus$.of(UpdateDoneEvent, hooks).subscribe(this.onCRUDDone.bind(this)),
          this.bus$.of(CommandCancel).subscribe(this.onCRUDDone.bind(this)),
          this.bus$.of(CommandNew).subscribe(this.onNewSchema.bind(this)),
          this.bus$.of(CommandEdit).subscribe(this.onEditSchema.bind(this)),
          this.bus$.of(CommandView).subscribe(this.onViewSchema.bind(this))
        ];
    }

    composeDestroy(): void {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    onCRUDDone(data: BusMessage | BusError): void {
      
      if (data instanceof BusError) { return; }
      if (data.params?.['skipRoute']) { return; }

      if (data.params?.['afterCommandDoneRedirectTo']) {
        const redirectTo = data.params?.['afterCommandDoneRedirectTo'];
        const [item] = data.payload.items;

        const buildedRedirect = item ?
                JSON.parse(JSON.stringify(redirectTo).replace(':id', item.id)) :
                redirectTo;

        this.router.navigate(buildedRedirect, { relativeTo: this.route });
        return;
      }

      this.router.navigate([{outlets: {popup: null}}], { relativeTo: this.route });
    }

    onNewSchema(): void {
      this.router.navigate(['create', 'new'], { relativeTo: this.findActivatedRoute(this.route) });
    }
    onEditSchema(data: BusMessage | BusError): void {
      if (data instanceof BusError) { return; }
      this.router.navigate(['edit', data.payload.id], { relativeTo: this.findActivatedRoute(this.route) });
    }

    onViewSchema(data: BusMessage | BusError): void {
      if (data instanceof BusError) { return; }
      this.router.navigate(['view', data.payload.id], { relativeTo: this.findActivatedRoute(this.route) });
    }

    closePopup(): void {
      this.router.navigate([{outlets: {popup: null}}], { relativeTo: this.route });
    }

    showPopup(action: boolean): void {
      this.popup = action;
    }


    // TODO: сделать абстрактным и возвращать ROUTE в зависимости от типа компонента
    private findActivatedRoute(ar: ActivatedRoute): ActivatedRoute {
      if (ar) {
        if (ar.children.length === 1) {
          const [next] = ar.children;
          return this.findActivatedRoute(next);
        }
        return ar;
      }

      if (this.route.children.length === 0) {
        return this.route;
      }

      return this.findActivatedRoute(this.route);
    }
  }
