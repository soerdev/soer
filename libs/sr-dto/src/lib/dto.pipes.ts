import { Pipe, PipeTransform } from '@angular/core';
import { DtoPack } from './interfaces/dto.pack.interface';

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
