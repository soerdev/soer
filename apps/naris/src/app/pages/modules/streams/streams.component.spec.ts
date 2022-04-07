import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StreamsComponent } from './streams.component';

describe('StreamsComponent', () => {
  let component: StreamsComponent;
  let fixture: ComponentFixture<StreamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamsComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
