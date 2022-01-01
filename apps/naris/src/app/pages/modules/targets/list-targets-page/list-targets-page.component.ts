import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { parseJsonDTOPack } from '../../../../api/json.dto.helpers';
import { CommandDelete } from '@soer/sr-dto';
import { DtoPack } from '@soer/sr-dto';
import { DataStoreService } from '@soer/sr-dto';
import { BusOwner } from '@soer/mixed-bus';
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
      @Inject('targets') private targetsId: BusOwner,
      @Inject('target') private targetId: BusOwner,
      private bus$: MixedBusService,
      private store$: DataStoreService,
  ) {
    this.targets$ = parseJsonDTOPack<TargetModel>(this.store$.of(this.targetsId), 'Targets');
  }

  onDelete(target: TargetModel): void {
    this.bus$.publish(
      new CommandDelete(this.targetId, {}, {tid: target.id})
    );
  }
}
