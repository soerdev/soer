import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuestionsPageComponent } from './list-questions-page.component';

describe('ListQuestionsPageComponent', () => {
  let component: ListQuestionsPageComponent;
  let fixture: ComponentFixture<ListQuestionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListQuestionsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQuestionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
