import { Component, Inject, OnInit } from '@angular/core';
import { BusEmitter, MixedBusService } from '@soer/mixed-bus';
import { CommandCreate, DataStoreService, deSerializeJson, extractDtoPackFromBus, SerializedJsonModel } from '@soer/sr-dto';
import { EmptyTarget, TargetModel, TemplateModel } from '../../../../api/targets/target.interface';
import { last, map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { target2template } from '../targets.helpers';
import { convertToJsonDTO } from '../../../../api/json.dto.helpers';


@Component({
  selector: 'soer-template-create',
  templateUrl: './template-create.component.html',
  styleUrls: ['./template-create.component.scss']
})
export class TemplateCreateComponent  {

  public template$: Observable<TargetModel>;
  public isPublic = false;

  constructor(
    @Inject('template') private templateId: BusEmitter,
    private bus$: MixedBusService,
    private store$: DataStoreService,
    private route: ActivatedRoute
  ) { 
    this.template$ = deSerializeJson<TargetModel>(
      extractDtoPackFromBus<SerializedJsonModel>(this.store$.of(this.route.snapshot.data['target']))
    ).pipe(map<TargetModel[], TargetModel>(data => {
      const [target] = data
      return target ? target2template(target) : EmptyTarget;
    }));
  }


  createTemplate(title: any, overview: any, template: TemplateModel): void {
    template.title = title.value;
    template.overview = overview.value;

    this.bus$.publish(
      new CommandCreate(
        this.templateId,
        { ...convertToJsonDTO(template, ['id']), accessTag: this.isPublic ? 'ALL' : 'PRIVATE'},
        {skipRoute: true, skipInfo: true}
      )
    );
  }
}
