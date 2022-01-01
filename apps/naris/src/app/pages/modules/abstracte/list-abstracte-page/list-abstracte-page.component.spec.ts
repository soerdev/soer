import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAbstractePageComponent } from './list-abstracte-page.component';

describe('ListAbstractePageComponent', () => {
  let component: ListAbstractePageComponent;
  let fixture: ComponentFixture<ListAbstractePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAbstractePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAbstractePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
