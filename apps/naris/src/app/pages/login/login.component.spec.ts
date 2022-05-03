import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, ComponentFixture, TestBed, flush } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { LoginRoutesModule } from './login-routing.module';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        CommonModule,
        FormsModule,
        LoginRoutesModule,
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzInputNumberModule,
        NzCheckboxModule,
        NzSpinModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NzButtonModule
      ],
      providers: [
        FormBuilder,
        {provide: 'AuthService', useValue: {}},
        {provide: 'AuthServiceConfig', useValue: {}},

      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    flush();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
