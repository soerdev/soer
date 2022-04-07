import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ComposeOnePageComponent } from './compose-one-page.component';

class MockNzMessageService {
  error(msg: string): void {
    // empty
  }

  success(msg: string): void {
    // empty
  }
}
describe('ComposeOnePageComponent', () => {
  let component: ComposeOnePageComponent;
  let fixture: ComponentFixture<ComposeOnePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComposeOnePageComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: 'HookDomain', useValue: []},
        {provide: NzMessageService, useClass: MockNzMessageService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeOnePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
