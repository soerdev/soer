import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AimModel, EMPTY_AIM } from '../interfaces/aim.model';

@Component({
  selector: 'soer-aims-tree',
  templateUrl: './aims-tree.component.html',
  styleUrls: ['./aims-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AimsTreeComponent  {
  @Input() isEdit = false;
  @Input() hideCompleted = false;
  @Input() root: AimModel = EMPTY_AIM;
  @Output() add: EventEmitter<AimModel> = new EventEmitter<AimModel>();
  @Output() delete: EventEmitter<AimModel> = new EventEmitter<AimModel>();
  @Output() update: EventEmitter<AimModel> = new EventEmitter<AimModel>();
  doneProgress = 100;
}
