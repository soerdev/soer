import { Injectable } from '@angular/core';
import { TargetMiddleware } from './helpers/target.middleware';
import { AimModel } from './interfaces/aim.model';






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


@Injectable()
export class TargetService {

  constructor() { 
    console.log('????', 'TARGET SERVICE');
  }

  factory(target: AimModel): TargetMiddleware {
    return new TargetMiddleware(target);
  }

  check(task: AimModel, target: AimModel): void {
    const progress = task.progress === 100 ? 0 : 100;
    propagateProgress(task, progress);
    updateProgress(target);
  }

}
