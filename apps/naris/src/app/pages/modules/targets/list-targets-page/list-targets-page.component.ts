import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { parseJsonDTOPack } from '../../../../api/json.dto.helpers';
import { CommandDelete } from '@soer/sr-dto';
import { DtoPack } from '@soer/sr-dto';
import { DataStoreService } from '@soer/sr-dto';
import { BusEmitter } from '@soer/mixed-bus';
import { MixedBusService } from '@soer/mixed-bus';
import { TargetModel } from '../../../../api/targets/target.interface';

@Component({
  selector: 'soer-list-targets-page',
  templateUrl: './list-targets-page.component.html',
  styleUrls: ['./list-targets-page.component.scss']
})
export class ListTargetsPageComponent  {
  public targets$: Observable<DtoPack<TargetModel>>;
  constructor(
      @Inject('targets') private targetsId: BusEmitter,
      @Inject('target') private targetId: BusEmitter,
      private bus$: MixedBusService,
      private store$: DataStoreService,
  ) {
    this.targets$ = parseJsonDTOPack<TargetModel>(this.store$.of(this.targetsId), 'Targets list');
  }

  onDelete(target: TargetModel): void {
    this.bus$.publish(
      new CommandDelete(this.targetId, {}, {tid: target.id})
    );
  }
}
