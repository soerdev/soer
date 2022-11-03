import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AimModel, EMPTY_AIM } from '../interfaces/aim.model';
import { TargetService } from '../target.service';

@Component({
  selector: 'soer-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TargetComponent {
  public readonly gradientColors = { '0%': '#ff0000', '50%': '#ff0000', '75%': '#ff9900', '100%': '#0f0' };

  @Input() target: AimModel = EMPTY_AIM;
  @Output() update: EventEmitter<AimModel> = new EventEmitter<AimModel>();
  @Output() edit: EventEmitter<AimModel> = new EventEmitter<AimModel>();

  constructor(private targetService: TargetService) {}

  check(task: AimModel, target: AimModel): void {
    this.targetService.check(task, target);
    this.update.emit(target);
  }

  onEdit(): void {
    this.edit.emit(this.target);
  }

}
