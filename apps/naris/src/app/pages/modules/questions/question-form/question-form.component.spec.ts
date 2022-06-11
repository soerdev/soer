import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormBuilder, UntypedFormBuilder} from '@angular/forms';
import { ANY_SERVICE } from '@soer/mixed-bus';

import { QuestionFormComponent } from './question-form.component';

describe('QuestionFormComponent', () => {
  let component: QuestionFormComponent;
  let fixture: ComponentFixture<QuestionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionFormComponent ],
      providers: [
        FormBuilder,
        {provide: 'questions', useValue: ANY_SERVICE},
        {provide: 'question', useValue: ANY_SERVICE},
        UntypedFormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
