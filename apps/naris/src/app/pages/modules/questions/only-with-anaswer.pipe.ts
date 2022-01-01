import { Pipe, PipeTransform } from '@angular/core';
import { QuestionModel } from 'src/app/api/questions/question.model';

@Pipe({
  name: 'onlyWithAnaswer'
})
export class OnlyWithAnaswerPipe implements PipeTransform {

  transform(value: QuestionModel[], ...args: unknown[]): unknown {
    if (Array.isArray(value)) {
      return value.filter(question => question.url !== null);
    }
    return [];
  }

}
