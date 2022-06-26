import { BusEmitter, BusMessage } from "@soer/mixed-bus";
import { map, Observable } from "rxjs";
import { DtoPack, INIT, OK } from "./interfaces/dto.pack.interface";
import { SerializedJsonModel } from "./interfaces/serialize-json.model";
import { CRUDBusEmitter } from "./sr-dto.module";

export const DTO_EMPTY: DtoPack<void> = {status: OK, items: []};

export function isCRUDBusEmitter(value: CRUDBusEmitter | BusEmitter): value is CRUDBusEmitter {
    return !!value['sid'] && !!value['schema'] && !!value['schema']['url'];
}

export function extractDtoPackFromBus<T>(messages$: Observable<BusMessage>): Observable<DtoPack<T>> {
    return messages$.pipe(map<BusMessage, DtoPack<T>>( data => {
        const result: T[] = [];
        if (data?.payload?.status === OK) {
            data?.payload.items.forEach((item: any) => result.push(item as T));
        }
        return {status: data?.payload?.status ?? OK, items: result};
    })
    );
}


export function deSerializeJson<T>(pack: Observable<DtoPack<SerializedJsonModel>>, empty?: T): Observable<T[]> {
    return pack.pipe(map<DtoPack<SerializedJsonModel>, T[]>( data => {
        const result: T[] = [];
        if (data?.status === OK) {
            if (data.items.length > 0) {
            data.items.forEach(serializedData => result.push({...JSON.parse(serializedData.json), id: serializedData.id} as T))
            } else if (empty) {
                result.push(JSON.parse(JSON.stringify(empty)));
            }
        }
        return result;
    })
    );
}