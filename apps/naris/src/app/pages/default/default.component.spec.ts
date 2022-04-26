import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { DefaultComponent } from './default.component';
import {RouterTestingModule} from "@angular/router/testing";
import { NzMessageService } from 'ng-zorro-antd/message';
import { SrDTOModule } from '@soer/sr-dto';
import { ANY_SERVICE } from '@soer/mixed-bus';

class MockNzMessageService {

}
describe('DefaultComponent', () => {
  let component: DefaultComponent;
  let fixture: ComponentFixture<DefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SrDTOModule
      ],
      providers: [ 
        {provide: 'manifest', useValue: ANY_SERVICE},
        {provide: 'AuthService', useValue: {}},
        {provide: 'AuthServiceConfig', useValue: {}},
        {provide: NzMessageService, useClass: MockNzMessageService}
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
