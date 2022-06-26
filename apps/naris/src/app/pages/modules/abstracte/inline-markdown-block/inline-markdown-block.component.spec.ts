import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineMarkdownBlockComponent } from './inline-markdown-block.component';

describe('InlineMarkdownBlockComponent', () => {
  let component: InlineMarkdownBlockComponent;
  let fixture: ComponentFixture<InlineMarkdownBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InlineMarkdownBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InlineMarkdownBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
