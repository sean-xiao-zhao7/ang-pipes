import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, input: string, propName: string): unknown {
    if (value.length <= 0 || !input) {
      return value;
    } else {
      const resultArray = [];
      for (const item of value) {
        if (item[propName] === input) {
          resultArray.push(item);
        }
      }
      return resultArray;
    }
  }
}
