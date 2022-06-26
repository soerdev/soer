import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';


@Component({
  selector: 'soer-inline-markdown-block',
  templateUrl: './inline-markdown-block.component.html',
  styleUrls: ['./inline-markdown-block.component.scss'],
})
export class InlineMarkdownBlockComponent {
  @ViewChild("edit") set editRef(ref: ElementRef) {
    if (ref) {
      ref.nativeElement.focus();
    }
  }
  @Input() localIndex = -1;
  @Input() markdownText = '';
  @Input() isEdit = false;
  @Output() addBlock = new EventEmitter<number>();
  @Output() removeBlock = new EventEmitter<number>();
  @Output() endEdit = new EventEmitter<number>();
  @Output() moveUp = new EventEmitter<number>();
  @Output() moveDown = new EventEmitter<number>();
 
  @Output() markdownTextChange = new EventEmitter<string>();

  command($event: KeyboardEvent): void {
    if ($event.altKey && $event.code === 'Enter') {
      this.endEdit.next(this.localIndex);
      this.isEdit = false;
      this.addBlock.next(this.localIndex);
    }
    if ($event.altKey && $event.code === 'Backspace') {
      this.endEdit.next(this.localIndex);
      this.isEdit = false;
      this.removeBlock.next(this.localIndex);
    }
    if ($event.altKey && $event.code === 'ArrowUp') {
      this.moveUp.next(this.localIndex);
    }
    if ($event.altKey && $event.code === 'ArrowDown') {
      this.moveDown.next(this.localIndex);
    }

    if ($event.code === 'Escape') {
      this.isEdit = false;
    }
  }

  onEndEdit(): void {
    this.isEdit = false;
    this.endEdit.next(this.localIndex);
  }
}
