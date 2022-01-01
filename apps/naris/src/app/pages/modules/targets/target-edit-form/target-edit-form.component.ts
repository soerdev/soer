import { AfterViewInit, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { convertToJsonDTO } from 'src/app/api/json.dto.helpers';
import { CommandCreate, CommandUpdate } from 'src/app/packages/dto/bus-messages/bus.messages';
import { DataStoreService } from 'src/app/packages/dto/services/data-store.service';
import { BusOwner } from 'src/app/packages/mixed-bus/interfaces/mixed-bus.interface';
import { MixedBusService } from 'src/app/packages/mixed-bus/mixed-bus.service';

@Component({
  selector: 'app-target-edit-form',
  templateUrl: './target-edit-form.component.html',
  styleUrls: ['./target-edit-form.component.scss']
})
export class TargetEditFormComponent implements OnInit, AfterViewInit {

  @Input() title = '';
  @Input() overview = '';
  @ViewChild('titleElem') titleElem: any;

  log = console.log;
  form: FormGroup;
  constructor(
    @Inject('target') private targetId: BusOwner,
    private bus$: MixedBusService,
    private store$: DataStoreService,
    private formBuilder: FormBuilder
  ) {
      this.form = this.formBuilder.group({
        id: [null],
        title: ['', [Validators.required, Validators.maxLength(140)]],
        overview: ['', [Validators.maxLength(512)]],
        progress: 0,
        tasks: [[]]
      });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.titleElem.nativeElement.focus();
  }

  onSubmit(): void {
   if (this.form.value.id === null) {
      this.bus$.publish<CommandCreate>(
        new CommandCreate(
          this.targetId,
          convertToJsonDTO(this.form.value, ['id'])
        )
      );
    } else {
      this.bus$.publish<CommandUpdate>(
        new CommandUpdate(
          this.targetId,
          { ...convertToJsonDTO(this.form.value, ['id']), id: this.form.value.id }
        )
      );
    }
  }

}
