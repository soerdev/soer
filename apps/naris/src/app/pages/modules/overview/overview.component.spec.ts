import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ANY_SERVICE } from '@soer/mixed-bus';
import { DemoNgZorroAntdModule } from '../../demo.module';

import { OverviewComponent } from './overview.component';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        DemoNgZorroAntdModule
      ],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {data: {
              workshops: [],
              streams: [], 
              brif: {role: {}, contacts: [], social: []}
            }
          } 
        }},
        {provide: 'workbooks', useValue: ANY_SERVICE},
        {provide: 'targets', useValue: ANY_SERVICE},
        {provide: 'questions', useValue: ANY_SERVICE},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain metrics sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.metrics')).toBeTruthy();
  });
});
