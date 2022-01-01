import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { parseJsonDTOPack } from 'src/app/api/json.dto.helpers';
import { TargetModel } from 'src/app/api/targets/target.interface';
import { DtoPack } from 'src/app/packages/dto/interfaces/dto.pack.interface';
import { DataStoreService } from 'src/app/packages/dto/services/data-store.service';
import { BusOwner } from 'src/app/packages/mixed-bus/interfaces/mixed-bus.interface';

@Component({
  selector: 'app-list-templates-page',
  templateUrl: './list-templates-page.component.html',
  styleUrls: ['./list-templates-page.component.scss']
})
export class ListTemplatesPageComponent implements OnInit {
  public templates$: Observable<DtoPack<TargetModel>>;
  constructor(
      @Inject('targets') private targetsId: BusOwner,
      private store$: DataStoreService,
  ) { }

  ngOnInit(): void {
    this.templates$ = parseJsonDTOPack<TargetModel>(this.store$.of(this.targetsId), 'TargetsTemplates');
  }

}
