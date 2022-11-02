import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AimModel, EMPTY_AIM } from '../interfaces/aim.model';

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
  check(task: AimModel, target: AimModel): void {
    
    const progress =task.progress === 100 ? 0 : 100;
    propagateProgress(task, progress);
    updateProgress(target);
    this.update.emit(target);
  }

}


function propagateProgress(target: AimModel, progress: number): void {
  if (target.tasks?.length > 0) {
    target.tasks.forEach(task => propagateProgress(task, progress));
  }
  target.progress = progress;
}

function updateProgress(target: AimModel): void {
  if (target.tasks?.length > 0) {
      target.tasks.forEach( task => updateProgress(task));
      target.progress = calcProgress(target);
  }
}

function calcProgress(target: AimModel): number {
  const value = target.tasks.reduce((r, v) => ({ total: r.total + 100, real: r.real + v.progress }), { total: 0, real: 0 });
  return value.total > 0 ? Math.floor(value.real / value.total * 100) : 0;
}
