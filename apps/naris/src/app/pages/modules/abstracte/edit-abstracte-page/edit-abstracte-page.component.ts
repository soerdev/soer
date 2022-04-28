import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { convertToJsonDTO, parseJsonDTO } from '../../../../api/json.dto.helpers';
import { EMPTY_WORKBOOK, WorkbookModel } from '../../../../api/workbook/workbook.model';
import { DataStoreService } from '@soer/sr-dto';
import { MixedBusService } from '@soer/mixed-bus';
import { CommandCreate, CommandUpdate } from '@soer/sr-dto';
import { BusEmitter } from '@soer/mixed-bus';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'soer-edit-abstracte-page',
  templateUrl: './edit-abstracte-page.component.html',
  styleUrls: ['./edit-abstracte-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditAbstractePageComponent implements OnDestroy {
  form: FormGroup;
  public previewFlag = false;
  private workbookId: BusEmitter;
  subscriptions: Subscription[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private bus$: MixedBusService,
    private store$: DataStoreService,
    private route: ActivatedRoute
  ) {

    this.workbookId = this.route.snapshot.data['workbook'];

    this.form = this.formBuilder.group({
      id: [null],
      question: [null, [Validators.maxLength(255)]],
      text: [null, [Validators.maxLength(255)]]
    });
    this.subscriptions = [
      parseJsonDTO<WorkbookModel>(this.store$.of(this.workbookId), 'workbook' + Math.random()).subscribe(
        data => {
          const form = data?.pop() || EMPTY_WORKBOOK;
          console.log(form)
          this.form.patchValue(form);
        }
      )
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  onSubmit(): void {
    if (this.form.value.id === null) {
          this.bus$.publish(
              new CommandCreate(
                this.workbookId,
                convertToJsonDTO(this.form.value, ['id']),
                { afterCommandDoneRedirectTo: ['.']}
              )
          );
    } else {
      this.bus$.publish(
        new CommandUpdate(
          this.workbookId,
          {...convertToJsonDTO(this.form.value, ['id']), id: this.form.value.id}
        )
    );
    }
  }
}
