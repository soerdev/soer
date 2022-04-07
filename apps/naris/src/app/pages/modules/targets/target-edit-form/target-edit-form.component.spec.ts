import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ANY_SERVICE } from '@soer/mixed-bus';

import { TargetEditFormComponent } from './target-edit-form.component';

describe('TargetEditFormComponent', () => {
  let component: TargetEditFormComponent;
  let fixture: ComponentFixture<TargetEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetEditFormComponent ],
      providers: [
        {provide: 'target', useValue: ANY_SERVICE},
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
