import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { convertToJsonDTO } from '../../../../api/json.dto.helpers';
import { BusEmitter, MixedBusService } from '@soer/mixed-bus';
import { CommandCreate, CommandUpdate, DataStoreService } from '@soer/sr-dto';

@Component({
  selector: 'soer-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent {

  @Output() submitForm: EventEmitter<any> = new EventEmitter();
  form: UntypedFormGroup;

  constructor(
    @Inject('question') private questionId: BusEmitter,
    private bus$: MixedBusService,
    private store$: DataStoreService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.form = this.formBuilder.group({
      id: [null],
      question: [null, [Validators.maxLength(255)]]
    });
  }

  onSubmit(): void {
    if (this.form.value.id === null) {
      this.bus$.publish(
        new CommandCreate(
          this.questionId,
          this.form.value,
          { afterCommandDoneRedirectTo: ['.'] }
        )
      );
    } else {
      this.bus$.publish(
        new CommandUpdate(
          this.questionId,
          { ...convertToJsonDTO(this.form.value, ['id']), id: this.form.value.id }
        )
      );
    }
  }

}
