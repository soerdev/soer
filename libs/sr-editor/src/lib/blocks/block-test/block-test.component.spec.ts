import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTestComponent } from './block-test.component';

describe('BlockTestComponent', () => {
  let component: BlockTestComponent;
  let fixture: ComponentFixture<BlockTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlockTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
