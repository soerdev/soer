import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeTabPageComponent } from './compose-tab-page.component';

describe('ComposeTabPageComponent', () => {
  let component: ComposeTabPageComponent;
  let fixture: ComponentFixture<ComposeTabPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComposeTabPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeTabPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
