import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConverter'
})
export class TimeConverterPipe implements PipeTransform {
  transform(timeValue: string): string {
    if (timeValue){
      const timeValues = timeValue.split(':');
      const hourValue = parseInt(timeValues[0], 10);
      if (hourValue === 12) {
        return `${hourValue}:${timeValues[1]} PM`;
      }
      if (hourValue === 0) {
        return `12:${timeValues[1]} AM`;
      }
      if (hourValue > 11) {
        return `${hourValue - 12}:${timeValues[1]} PM`;
      }
      return `${hourValue}:${timeValues[1]} AM`;
    }
  }
}
