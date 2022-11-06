import { AimModel } from "../interfaces/aim.model";
import { UUID } from "angular2-uuid";


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
  

export class TargetMiddleware {
    constructor(private target: AimModel) {}

    public updateProgress(): AimModel {
        updateProgress(this.target);
        return this.target;
    }

    public addTaskTo(aim: AimModel): AimModel {
        aim.tasks.push({
            id: UUID.UUID(),
            title: 'New task' + Math.random(),
            progress: 0,
            overview: '',
            tasks: []
        });
        this.updateProgress();
        return this.target;
    }

    public delete(aim: AimModel): AimModel {
        const recursiveFilter = (root: AimModel) => {
            root.tasks = root.tasks.filter(task => task !== aim);
            root.tasks.forEach(task => recursiveFilter(task));
            return root;
        }

        recursiveFilter(this.target);
        this.updateProgress();
        return this.target;
    }



}