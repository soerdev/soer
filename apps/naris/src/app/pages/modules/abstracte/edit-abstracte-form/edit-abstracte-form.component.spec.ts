import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAbstracteFormComponent } from './edit-abstracte-form.component';

describe('EditAbstracteFormComponent', () => {
  let component: EditAbstracteFormComponent;
  let fixture: ComponentFixture<EditAbstracteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAbstracteFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditAbstracteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
