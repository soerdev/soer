import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTreeEditFormComponent } from './task-tree-edit-form.component';

describe('TaskTreeEditFormComponent', () => {
  let component: TaskTreeEditFormComponent;
  let fixture: ComponentFixture<TaskTreeEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskTreeEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTreeEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
