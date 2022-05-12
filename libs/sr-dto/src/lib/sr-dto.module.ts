import { CommonModule } from "@angular/common";
import { Provider } from "@angular/compiler/src/core";
import { ModuleWithProviders } from "@angular/compiler/src/core";
import { NgModule } from "@angular/core";
import { BusEmitter, BusKey, BusKeys, MixedBusService } from "@soer/mixed-bus";
import { isCRUDBusEmitter } from "./dto.helpers";
import { DtoLastItemPipe, DeSerializeJsonPipe } from "./dto.pipes";
import { DataStoreService } from "./services/data-store.service";
import { ResolveReadEmitterService } from "./services/resolve-read-emitter.service";
import { StoreCrudService } from "./services/store.crud.service";

export type CRUDMethods = { create: string, read: string, update: string, delete: string };
export interface CRUDBusEmitter extends BusEmitter {
  schema: CRUDMethods;
}
interface CrudOptions {
  namespace: string;
  schema: CRUDMethods,
  keys: BusKeys,
}

@NgModule({
  declarations: [DtoLastItemPipe, DeSerializeJsonPipe],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [DtoLastItemPipe, DeSerializeJsonPipe]
})
export class SrDTOModule {

  static forChild(options: CrudOptions): ModuleWithProviders {
    return {
      ngModule: SrDTOModule,
      providers: createcrudEmitters(options)
    };
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SrDTOModule,
      providers: [StoreCrudService, DataStoreService]
    };
  }
}

function createcrudEmitters(options: CrudOptions): Provider[] {
  const result: Provider[] = [];
  const sid = Symbol(options.namespace);

  Object.keys(options.keys).forEach(keyName => {
    const createCRUDBusEmitterFrom = (schema: CRUDMethods | CRUDBusEmitter, key: BusKey ): CRUDBusEmitter  => {
      if (isCRUDBusEmitter(schema)) {
        return schema;
      }
      return { sid, schema, key };
    }

    const emitter: CRUDBusEmitter = createCRUDBusEmitterFrom(options.schema, options.keys[keyName]);

    result.push(
      createDataEmitter(keyName, emitter),
      createCRUDSBusId(keyName, emitter)
    );
  });
  return result;
}

function createCRUDSBusId(providerName: string, emitter: CRUDBusEmitter): Provider {
  return {
    provide: `${providerName}`,
    useFactory: () => {
      return emitter;
    }
  }
}

function createDataEmitter(providerName: string, emitter: CRUDBusEmitter): Provider {
  return {
    provide: `${providerName}Emitter`,
    useFactory: (bus$: MixedBusService) => {
      return new ResolveReadEmitterService(bus$, emitter);
    },
    deps: [MixedBusService]
  }
}