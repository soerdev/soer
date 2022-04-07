import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ANY_SERVICE, MixedBusModule } from '@soer/mixed-bus';
import { SrDTOModule } from '@soer/sr-dto';
import { EditAbstractePageComponent } from './edit-abstracte-page.component';

describe('EditAbstractePageComponent', () => {
  let component: EditAbstractePageComponent;
  let fixture: ComponentFixture<EditAbstractePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAbstractePageComponent ],
      imports: [
        MixedBusModule,
        SrDTOModule,
        HttpClientTestingModule
      ],
      providers: [
        FormBuilder,
        {  provide: 'workbook', useValue: ANY_SERVICE }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAbstractePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
