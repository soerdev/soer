import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ANY_SERVICE } from '@soer/mixed-bus';

import { ListTemplatesPageComponent } from './list-templates-page.component';

describe('ListTemplatesPageComponent', () => {
  let component: ListTemplatesPageComponent;
  let fixture: ComponentFixture<ListTemplatesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTemplatesPageComponent ],
      providers: [
        {provide: 'template', useValue: ANY_SERVICE},
        {provide: 'templates', useValue: ANY_SERVICE},

      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTemplatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
