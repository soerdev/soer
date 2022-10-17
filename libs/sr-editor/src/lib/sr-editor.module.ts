import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { BlockEditorComponent } from './blocks/block-editor/block-editor.component';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';
import { TextareaAutoresizeDirective } from './textarea-autoresize.directive';

@NgModule({
  imports: [
    CommonModule,
    MarkdownModule.forRoot(),
    FormsModule,
  ],
  declarations: [EditorComponent, BlockEditorComponent, TextareaAutoresizeDirective],
  exports: [EditorComponent],
})
export class SrEditorModule {}
