import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DtoPack, OK } from "../packages/dto/interfaces/dto.pack.interface";
import { BusMessage } from "../packages/mixed-bus/interfaces/mixed-bus.interface";
import { JsonDTOModel } from "./jsonDto.model";


export function parseJsonDTO<T>(messages$: Observable<BusMessage>, id: string): Observable<T[]> {

    console.log('Start pipe =>', id);
    return messages$.pipe(map( (data: BusMessage|null) => {
        const result: T[] = [];
        console.log('Pipe map => ', id, data);
        if (data?.result?.status === OK) {
            data?.result.items.forEach(data => result.push({...JSON.parse(data.json), id: data.id}));
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
        if (data?.result?.status === OK) {
            data?.result.items.forEach(data => result.push({...JSON.parse(data.json), id: data.id}));
        }
        console.log(`after pipe '${id}' =>`, result, data);
        return {status: data?.result?.status ?? OK, items: result};
    })
    );
}

export function convertToJsonDTO<T>(data: T, excludeKeys: string[] = []): JsonDTOModel {
    const result = {};
    Object.keys(data).forEach(key => excludeKeys.includes(key) ? null : result[key] = data[key]);
    return {json: JSON.stringify(result)};
}
