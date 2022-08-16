import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeIcontabsPageComponent } from './compose-icontabs-page.component';

describe('ComposeIcontabsPageComponent', () => {
  let component: ComposeIcontabsPageComponent;
  let fixture: ComponentFixture<ComposeIcontabsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComposeIcontabsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComposeIcontabsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
