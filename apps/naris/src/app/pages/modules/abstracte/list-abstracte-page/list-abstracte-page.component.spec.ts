import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ANY_SERVICE, MixedBusModule } from '@soer/mixed-bus';
import { SrDTOModule } from '@soer/sr-dto';

import { ListAbstractePageComponent } from './list-abstracte-page.component';

describe('ListAbstractePageComponent', () => {
  let component: ListAbstractePageComponent;
  let fixture: ComponentFixture<ListAbstractePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAbstractePageComponent ],
      imports: [
        MixedBusModule,
        SrDTOModule
      ],
      providers: [
        {provide: 'workbooks', useValue: ANY_SERVICE},
        {provide: 'workbook', useValue: ANY_SERVICE},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAbstractePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
