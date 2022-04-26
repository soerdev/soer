import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NzMessageService } from 'ng-zorro-antd/message';

import { ComposeTabPageComponent } from './compose-tab-page.component';

class MockNzMessageService {
  error(msg: string): void {
    // empty
  }

  success(msg: string): void {
    // empty
  }
}
describe('ComposeTabPageComponent', () => {
  let component: ComposeTabPageComponent;
  let fixture: ComponentFixture<ComposeTabPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComposeTabPageComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: NzMessageService, useClass: MockNzMessageService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeTabPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
