import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AimRawComponent } from './aim-raw.component';

describe('AimRawComponent', () => {
  let component: AimRawComponent;
  let fixture: ComponentFixture<AimRawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AimRawComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AimRawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
