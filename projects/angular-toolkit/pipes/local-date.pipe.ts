import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
/*
 * format date to sessionService local
*/
@Pipe({name: 'localeDate'})
export class LocaleDatePipe implements PipeTransform {
  constructor(private translate: TranslateService){}
  
  transform(value: string | Date): moment.Moment {
    return moment.utc(value).locale(this.translate.currentLang ?? sessionStorage.getItem('language') ?? localStorage.getItem('language') ?? 'en-GB');
  }
}
