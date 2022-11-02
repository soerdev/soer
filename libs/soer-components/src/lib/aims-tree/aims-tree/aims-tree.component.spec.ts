import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AimsTreeComponent } from './aims-tree.component';

describe('AimsTreeComponent', () => {
  let component: AimsTreeComponent;
  let fixture: ComponentFixture<AimsTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AimsTreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AimsTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
