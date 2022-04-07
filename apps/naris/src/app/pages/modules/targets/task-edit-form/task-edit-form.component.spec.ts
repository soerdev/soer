import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ANY_SERVICE } from '@soer/mixed-bus';

import { TaskEditFormComponent } from './task-edit-form.component';

describe('TaskEditFormComponent', () => {
  let component: TaskEditFormComponent;
  let fixture: ComponentFixture<TaskEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskEditFormComponent ],
      providers: [
        {provide: 'target', useValue: ANY_SERVICE},
        {provide: 'template', useValue: ANY_SERVICE},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
