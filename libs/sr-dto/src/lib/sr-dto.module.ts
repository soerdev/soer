import { CommonModule } from "@angular/common";
import { Provider } from "@angular/compiler/src/core";
import { ModuleWithProviders } from "@angular/compiler/src/core";
import { NgModule } from "@angular/core";
import { BusEmitter, MixedBusService } from "@soer/mixed-bus";
import { DataStoreService } from "./services/data-store.service";
import { HookService } from "./services/hook.service";
import { ResolveReadEmitterService } from "./services/resolve-read-emitter.service";
import { StoreCrudService } from "./services/store.crud.service";

export type CRUDMethods = { sid?: symbol, create: string, read: string, update: string, delete: string };
interface CrudOptions {
  namespace: string;
  crudProviders: { [key: string]: CRUDMethods };
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: []
})
export class SrDTOModule {

  static forChild(options: CrudOptions): ModuleWithProviders {
    return {
      ngModule: SrDTOModule,
      providers: crudProivders(options)
    };
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SrDTOModule,
      providers: [StoreCrudService, DataStoreService]
    };
  }
}

function crudProivders(options: CrudOptions): Provider[] {
  const result: Provider[] = [];
  const hooks: BusEmitter[] = [];
  Object.keys(options.crudProviders).forEach(providerName => {
    const schema: CRUDMethods = options.crudProviders[providerName];
    const providerSid = schema.sid ?? Symbol(providerName);

    hooks.push({ sid: providerSid, schema });

    result.push(
      createDataEmitterProvider(providerName, providerSid, schema),
      createCRUDSBusId(providerName, providerSid, schema)
    );
  });
  result.push(createDomain(hooks, options.namespace));
  return result;
}

function createCRUDSBusId(providerName: string, sid: symbol, methods: CRUDMethods): Provider {
  return {
    provide: `${providerName}`,
    useFactory: () => {
      return { sid, schema: methods };
    }
  }
}

function createDataEmitterProvider(providerName: string, sid: symbol, methods: CRUDMethods): Provider {
  return {
    provide: `${providerName}Emitter`,
    useFactory: (bus$: MixedBusService) => {
      return new ResolveReadEmitterService(bus$, { sid, schema: methods });
    },
    deps: [MixedBusService]
  }
}

function createDomain(hooks: BusEmitter[], domainName: string): Provider {
  return {
    provide: `HookDomain`,
    multi: true,
    useFactory: (bus$: MixedBusService) => {
      return new HookService(domainName, bus$, hooks);
    },
    deps: [MixedBusService]
  }
}
