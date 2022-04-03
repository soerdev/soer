import { BusMessage } from "@soer/mixed-bus";
import { DtoPack, OK } from "@soer/sr-dto";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { JsonDTOModel } from "./jsonDto.model";


export function parseJsonDTO<T>(messages$: Observable<BusMessage>, id: string): Observable<T[]> {

    console.log('Start pipe =>', id);
    return messages$.pipe(map( (data: BusMessage|null) => {
        const result: T[] = [];
        console.log('Pipe map => ', id, data);
        if (data?.payload?.status === OK) {
            data?.payload.items.forEach((data: any) => result.push({...JSON.parse(data.json), id: data.id}));
        }
        console.log('after pipe =>', id, result);
        return result;
    })
    );
}

export function parseJsonDTOPack<T>(messages$: Observable<BusMessage>, id: string): Observable<DtoPack<T>> {

    console.log(`Start pipe '${id}' => ok`); 
    return messages$.pipe(map( (data: BusMessage|null) => {
        const result: T[] = [];
        console.log(`Pipe map '${id}' => `, data);
        if (data?.payload?.status === OK) {
            data?.payload.items.forEach((data: any) => result.push({...JSON.parse(data.json), id: data.id}));
        }
        console.log(`after pipe '${id}' =>`, result, data);
        return {status: data?.payload?.status ?? OK, items: result};
    })
    );
}

export function convertToJsonDTO(data: any, excludeKeys: string[] = []): JsonDTOModel {
    const result: { [key: string]: string; } = {};
    Object.keys(data).forEach( (key: string) => excludeKeys.includes(key) ? null : result[key] = data[key]);
    return {json: JSON.stringify(result)};
}
