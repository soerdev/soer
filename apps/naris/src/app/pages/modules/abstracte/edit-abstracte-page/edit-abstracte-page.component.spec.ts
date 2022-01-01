import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAbstractePageComponent } from './edit-abstracte-page.component';

describe('EditAbstractePageComponent', () => {
  let component: EditAbstractePageComponent;
  let fixture: ComponentFixture<EditAbstractePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAbstractePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAbstractePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
