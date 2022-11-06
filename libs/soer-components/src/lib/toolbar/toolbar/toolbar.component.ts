import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'soer-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent  {
  @Input() actions: string[] = [];
  @Output() action: EventEmitter<string> = new EventEmitter<string>();
}
