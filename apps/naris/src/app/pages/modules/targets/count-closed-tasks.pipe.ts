import { Pipe, PipeTransform } from '@angular/core';
import { TargetModel } from '../../../api/targets/target.interface';
import { DONE_PROGRESS } from './targets.const';

@Pipe({
  name: 'countClosedTasks'
})
export class CountClosedTasksPipe implements PipeTransform {

  transform(target: TargetModel, ...args: unknown[]): unknown {
    return target.tasks?.length > 0 
         ?
           target.tasks.filter(task => task.progress === DONE_PROGRESS).length
         :
           0
   }

}
