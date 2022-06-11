import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormBuilder, UntypedFormBuilder} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ANY_SERVICE } from '@soer/mixed-bus';

import { TargetEditFormComponent } from './target-edit-form.component';

describe('TargetEditFormComponent', () => {
  let component: TargetEditFormComponent;
  let fixture: ComponentFixture<TargetEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetEditFormComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {data: {afterCommandDoneRedirectTo: ''}}}},
        {provide: 'target', useValue: ANY_SERVICE},
        FormBuilder,
        UntypedFormBuilder
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
