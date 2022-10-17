import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY_WORKBOOK, TextBlock, WorkbookModel } from '../interfaces/document.model';

@Component({
  selector: 'soer-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent  {
  @Input() document: WorkbookModel = EMPTY_WORKBOOK;
  @Output() save = new EventEmitter<WorkbookModel>();
  public previewFlag = false;
  public editIndex = -1;

  constructor(
      private cdp: ChangeDetectorRef,
      private _location: Location,
      private route: ActivatedRoute
    ) {
      this.route.queryParams.subscribe(params => {
        if (params['action'] === 'save') {
          this.save.next(this.document);
        }
        this.previewFlag = params['preview'] === 'true';
        this.cdp.markForCheck();
      });
    }

  move(from: number, to: number): void {
    const blocks = this.document.blocks;
    const tmp: TextBlock = blocks[to];
    if (tmp) {
      blocks[to] = blocks[from];
      blocks[from] = tmp;
      this.editIndex = -1;
      setTimeout(() =>{
         this.editIndex = to;
         this.cdp.detectChanges()
      }, 10);
    }

  }

  addBlockMarkdown(from: number): void {
    this.editIndex = from + 1;
    const left = this.document.blocks.slice(0, this.editIndex);
    const right = this.document.blocks.slice(this.editIndex);
    
    this.document.blocks = [...left, {text: '', type: 'markdown'}, ...right];
  }

  removeBlock(removeIndex: number): void {
    this.document.blocks = this.document.blocks.filter( (el, index) => removeIndex !== index);
    this.editIndex = -1;
  }
  
  onFolderUp() {
      this._location.back();
  }
}
