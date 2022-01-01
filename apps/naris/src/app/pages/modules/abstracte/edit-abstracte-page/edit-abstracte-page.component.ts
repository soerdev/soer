import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { convertToJsonDTO, parseJsonDTO } from '../../../../api/json.dto.helpers';
import { WorkbookModel } from '../../../../api/workbook/workbook.model';
import { DataStoreService } from '../../../../packages/dto/services/data-store.service';
import { MixedBusService } from '../../../../packages/mixed-bus/mixed-bus.service';
import { CommandCreate, CommandUpdate } from '../../../../packages/dto/bus-messages/bus.messages';
import { BusOwner } from '../../../../packages/mixed-bus/interfaces/mixed-bus.interface';

@Component({
  selector: 'app-edit-abstracte-page',
  templateUrl: './edit-abstracte-page.component.html',
  styleUrls: ['./edit-abstracte-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditAbstractePageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  public previewFlag = false;
  subscriptions = [];
  constructor(
    @Inject('workbook') private workbookId: BusOwner,
    private formBuilder: FormBuilder,
    private bus$: MixedBusService,
    private store$: DataStoreService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [null],
      question: [null, [Validators.maxLength(255)]],
      text: [null, [Validators.maxLength(255)]]
    });
    this.subscriptions = [
      parseJsonDTO<WorkbookModel>(this.store$.of(this.workbookId), 'workbook' + Math.random()).subscribe(
        data => {
          this.form.patchValue(data?.pop() || {});
        }
      )
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  onSubmit(): void {
    if (this.form.value.id === null) {
          this.bus$.publish<CommandCreate>(
              new CommandCreate(
                this.workbookId,
                convertToJsonDTO(this.form.value, ['id']),
              )
          );
    } else {
      this.bus$.publish<CommandUpdate>(
        new CommandUpdate(
          this.workbookId,
          {...convertToJsonDTO(this.form.value, ['id']), id: this.form.value.id}
        )
    );
    }
  }
}
