import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ANY_SERVICE } from '@soer/mixed-bus';

import { TemplateCreateComponent } from './template-create.component';

describe('TemplateCreateComponent', () => {
  let component: TemplateCreateComponent;
  let fixture: ComponentFixture<TemplateCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateCreateComponent ],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {data: {target: ANY_SERVICE}} }},
        {provide: 'target', useValue: ANY_SERVICE},
        {provide: 'template', useValue: ANY_SERVICE},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
