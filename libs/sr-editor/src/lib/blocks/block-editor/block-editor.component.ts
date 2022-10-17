import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TextBlock } from '../../interfaces/document.model';

@Component({
  selector: 'soer-block-editor',
  templateUrl: './block-editor.component.html',
  styleUrls: ['./block-editor.component.scss'],
})
export class BlockEditorComponent {
  @Input() textBlock: TextBlock = {type: 'markdown', text: ''};
  
  @ViewChild("edit") set editRef(ref: ElementRef) {
    if (ref) {
      ref.nativeElement.focus();
    }
  }
  @Input() localIndex = -1;
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
  }}
