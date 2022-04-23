import { Pipe, PipeTransform } from '@angular/core';
import { DtoPack } from './interfaces/dto.pack.interface';
import { SerializedJsonModel } from './interfaces/serialize-json.model';

@Pipe({
  name: 'dtoLastItem'
})
export class DtoLastItemPipe implements PipeTransform {

  transform<T>(dto: DtoPack<T> | null): T|null {
    if (dto?.items && dto.items.length) {
        return dto.items[dto.items.length - 1];
    }
    return null;
  }

}


@Pipe({
  name: 'deSerializeJSON'
})
export class DeSerializeJsonPipe implements PipeTransform {

  transform<T>(data: SerializedJsonModel | null): T|null {
    if (data?.json) {
        return JSON.parse(data.json) as T;
    }
    return null;
  }

}
