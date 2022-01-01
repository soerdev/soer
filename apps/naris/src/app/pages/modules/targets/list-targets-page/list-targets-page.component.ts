import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { parseJsonDTOPack } from 'src/app/api/json.dto.helpers';
import { CommandDelete } from 'src/app/packages/dto/bus-messages/bus.messages';
import { DtoPack } from 'src/app/packages/dto/interfaces/dto.pack.interface';
import { DataStoreService } from 'src/app/packages/dto/services/data-store.service';
import { BusOwner } from 'src/app/packages/mixed-bus/interfaces/mixed-bus.interface';
import { MixedBusService } from 'src/app/packages/mixed-bus/mixed-bus.service';
import { TargetModel } from '../../../../api/targets/target.interface';

@Component({
  selector: 'app-list-targets-page',
  templateUrl: './list-targets-page.component.html',
  styleUrls: ['./list-targets-page.component.scss']
})
export class ListTargetsPageComponent implements OnInit {
  public targets$: Observable<DtoPack<TargetModel>>;
  constructor(
      @Inject('targets') private targetsId: BusOwner,
      @Inject('target') private targetId: BusOwner,
      private bus$: MixedBusService,
      private store$: DataStoreService,
  ) { }

  ngOnInit(): void {
    this.targets$ = parseJsonDTOPack<TargetModel>(this.store$.of(this.targetsId), 'Targets');
  }

  onDelete(target: TargetModel): void {
    this.bus$.publish<CommandDelete>(
      new CommandDelete(this.targetId, {}, {tid: target.id})
    );
  }
}
