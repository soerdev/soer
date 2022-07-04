import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ApplicationService } from 'apps/naris/src/app/services/application.service';
import { MenuControl } from 'apps/naris/src/app/services/menu/MenuControl.class';
import { EMPTY_WORKBOOK, TextBlock, WorkbookModel } from '../../../../../app/api/workbook/workbook.model';

@Component({
  selector: 'soer-edit-abstracte-form',
  templateUrl: './edit-abstracte-form.component.html',
  styleUrls: ['./edit-abstracte-form.component.scss'],
})
export class EditAbstracteFormComponent  {
  @Input() workbook: WorkbookModel = EMPTY_WORKBOOK;
  @Output() save = new EventEmitter<WorkbookModel>();
  public previewFlag = false;
  public editIndex = -1;

  constructor(private cdp: ChangeDetectorRef,
    private app: ApplicationService
    ) {
      const save = new MenuControl('Save', 'save', () => {this.save.next(this.workbook)});
      const preview = new MenuControl('Preview', 'eye', () => {this.previewFlag = !this.previewFlag;});

      this.app.pageControls([ preview, save]);
    }

  move(from: number, to: number): void {
    const blocks = this.workbook.blocks;
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
    const left = this.workbook.blocks.slice(0, this.editIndex);
    const right = this.workbook.blocks.slice(this.editIndex);
    
    this.workbook.blocks = [...left, {text: '', type: 'markdown'}, ...right];
  }
  removeBlock(removeIndex: number): void {
    this.workbook.blocks = this.workbook.blocks.filter( (el, index) => removeIndex !== index);
    this.editIndex = -1;
  }
}
