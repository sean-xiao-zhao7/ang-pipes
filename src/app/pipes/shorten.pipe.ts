import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'shortenPipe' })
export class ShortenPipe implements PipeTransform {
  transform(value: any, limit: number) {
    return value.substr(0, limit ? limit : 10) + ' ...';
  }
}
