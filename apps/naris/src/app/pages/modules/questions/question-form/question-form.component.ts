import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { convertToJsonDTO } from '../../../../api/json.dto.helpers';
import { CommandCreate, CommandUpdate } from '../../../../packages/dto/bus-messages/bus.messages';
import { DataStoreService } from '../../../../packages/dto/services/data-store.service';
import { BusOwner } from '../../../../packages/mixed-bus/interfaces/mixed-bus.interface';
import { MixedBusService } from '../../../../packages/mixed-bus/mixed-bus.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  @Output() submitForm: EventEmitter<any> = new EventEmitter();
  form: FormGroup;

  constructor(
    @Inject('questions') private questionsId: BusOwner,
    @Inject('question') private questionId: BusOwner,
    private bus$: MixedBusService,
    private store$: DataStoreService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      id: [null],
      question: [null, [Validators.maxLength(255)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.value.id === null) {
      this.bus$.publish<CommandCreate>(
        new CommandCreate(
          this.questionId,
          this.form.value
        )
      );
    } else {
      this.bus$.publish<CommandUpdate>(
        new CommandUpdate(
          this.questionId,
          { ...convertToJsonDTO(this.form.value, ['id']), id: this.form.value.id }
        )
      );
    }
  }

}
