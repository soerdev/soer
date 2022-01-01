import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTargetsPageComponent } from './list-targets-page.component';

describe('ListTargetsPageComponent', () => {
  let component: ListTargetsPageComponent;
  let fixture: ComponentFixture<ListTargetsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTargetsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTargetsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
