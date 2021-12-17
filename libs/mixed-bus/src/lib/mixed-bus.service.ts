import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MixedBusService {

  message(): string {
    return 'Mixed bus';
  }
}
