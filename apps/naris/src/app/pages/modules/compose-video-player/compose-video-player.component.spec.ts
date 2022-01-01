import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeVideoPlayerComponent } from './compose-video-player.component';

describe('ComposeVideoPlayerComponent', () => {
  let component: ComposeVideoPlayerComponent;
  let fixture: ComponentFixture<ComposeVideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComposeVideoPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
