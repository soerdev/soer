import { TargetModel } from "../../../api/targets/target.interface";

export function propagateProgress(target: TargetModel, progress: number): void {
    if (target.tasks?.length > 0) {
      target.tasks.forEach(task => propagateProgress(task, progress));
    }
    target.progress = progress;
}
export function updateProgress(target: TargetModel): void {
    if (target.tasks?.length > 0) {
        target.tasks.forEach( task => updateProgress(task));
        target.progress = calcProgress(target);
    }
  }

export function calcProgress(target: TargetModel): number {
    const value = target.tasks.reduce((r, v) => ({ total: r.total + 100, real: r.real + v.progress }), { total: 0, real: 0 });
    return value.total > 0 ? Math.floor(value.real / value.total * 100) : 0;
}