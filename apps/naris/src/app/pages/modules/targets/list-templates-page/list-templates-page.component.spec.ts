import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTemplatesPageComponent } from './list-templates-page.component';

describe('ListTemplatesPageComponent', () => {
  let component: ListTemplatesPageComponent;
  let fixture: ComponentFixture<ListTemplatesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTemplatesPageComponent ]
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
