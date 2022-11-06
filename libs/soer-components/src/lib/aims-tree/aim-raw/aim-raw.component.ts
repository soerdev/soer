import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AimModel, EMPTY_AIM } from '../interfaces/aim.model';

@Component({
  selector: 'soer-aim-raw',
  templateUrl: './aim-raw.component.html',
  styleUrls: ['./aim-raw.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AimRawComponent {
  public readonly gradientColors = { '0%': '#ff0000', '50%': '#ff0000', '75%': '#ff9900', '100%': '#0f0' };
  @Input() isExpand = false;
  @Input() isEdit = false;
  @Input() aim: AimModel = EMPTY_AIM;

  @Output() update: EventEmitter<AimModel> = new EventEmitter<AimModel>();
  @Output() add: EventEmitter<AimModel> = new EventEmitter<AimModel>();
  @Output() delete: EventEmitter<AimModel> = new EventEmitter<AimModel>();
  @Output() expand: EventEmitter<boolean> = new EventEmitter<boolean>();
  doneProgress = 100;
  actions = ['plus', 'edit', 'delete']


  toggle(): void {
    this.isExpand = !this.isExpand;
    this.expand.emit(this.isExpand);
  }

  toolbarAction(action: string, task: AimModel): void {
    switch(action) {
      case 'edit':

        break;
      case 'plus':
         this.add.emit(task)
        break;
      case 'delete':
        console.log('Delete');
        this.delete.emit(task);
        break;
    }
  }
}
