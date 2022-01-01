import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionRulesComponent } from './question-rules.component';

describe('QuestionRulesComponent', () => {
  let component: QuestionRulesComponent;
  let fixture: ComponentFixture<QuestionRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
