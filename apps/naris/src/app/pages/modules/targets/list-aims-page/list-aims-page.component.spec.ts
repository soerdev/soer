import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAimsPageComponent } from './list-aims-page.component';

describe('ListAimsPageComponent', () => {
  let component: ListAimsPageComponent;
  let fixture: ComponentFixture<ListAimsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAimsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAimsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
