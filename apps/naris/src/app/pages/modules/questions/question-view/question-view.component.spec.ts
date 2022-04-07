import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ANY_SERVICE } from '@soer/mixed-bus';

import { QuestionViewComponent } from './question-view.component';

describe('QuestionViewComponent', () => {
  let component: QuestionViewComponent;
  let fixture: ComponentFixture<QuestionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionViewComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: 'question', useValue: ANY_SERVICE},
        {provide: 'questionsAll', useValue: ANY_SERVICE}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
