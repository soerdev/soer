import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'soer-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {
  @Input() label = '';
  @Input() checked = false;
  @Output() update: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggle(): void {
    this.checked = !this.checked;
    this.update.emit(this.checked);
  }
}
