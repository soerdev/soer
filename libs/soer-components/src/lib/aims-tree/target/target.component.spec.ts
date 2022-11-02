import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetComponent } from './target.component';

describe('TargetComponent', () => {
  let component: TargetComponent;
  let fixture: ComponentFixture<TargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TargetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
