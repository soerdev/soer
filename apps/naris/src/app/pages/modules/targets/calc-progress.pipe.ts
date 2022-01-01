import { Pipe, PipeTransform } from '@angular/core';
import { TargetModel } from 'src/app/api/targets/target.interface';

@Pipe({
  name: 'calcProgress'
})
export class CalcProgressPipe implements PipeTransform {

  transform(value: TargetModel, ...args: unknown[]): unknown {
    return value.tasks?.length > 0 ? this.calcProgress(value) : value.progress;
  }

  private calcProgress(target: TargetModel): number {
    const value = target.tasks.reduce((r, v) => ({ total: r.total + 100, real: r.real + v.progress }), { total: 0, real: 0 });
    return value.total > 0 ? Math.floor(value.real / value.total * 100) : 0;
  }
}
