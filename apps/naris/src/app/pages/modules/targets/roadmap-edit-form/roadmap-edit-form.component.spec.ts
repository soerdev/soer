import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapEditFormComponent } from './roadmap-edit-form.component';

describe('RoadmapEditFormComponent', () => {
  let component: RoadmapEditFormComponent;
  let fixture: ComponentFixture<RoadmapEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadmapEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadmapEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
