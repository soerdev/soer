import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeOnePageComponent } from './compose-one-page.component';

describe('ComposeOnePageComponent', () => {
  let component: ComposeOnePageComponent;
  let fixture: ComponentFixture<ComposeOnePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComposeOnePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeOnePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
