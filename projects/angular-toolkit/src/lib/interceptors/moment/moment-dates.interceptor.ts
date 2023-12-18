import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as moment from 'moment';

/**
 * Angular http interceptor used to convert date strings or moment objects to utc and avoid timezone variants
 */
@Injectable()
export class MomentDatesInterceptor implements HttpInterceptor {
  iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const req = request.clone({
        body: this.convertToUTC(request.body),
        params: this.convertParamsToUTC(request.params),
    });

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return event.clone({ body: this.convertToUTC(event.body) });
        }

        return event;
      })
    );
  }

  private convertToUTC(body: { [key:string]: any }) {
    if (body && typeof body === 'object') {
        for (const key of Object.keys(body)) {
            const value = body[key];
            if (this.isIso8601(value) || moment.isMoment(value)) {
              body[key] = moment.utc(value).millisecond(0);
            } else if (typeof value === 'object') {
              this.convertToUTC(value);
            }
        }
    }

    return body;
  }

  private convertParamsToUTC(params: HttpParams) {
    if (params && params instanceof HttpParams) {
        for (const key of params.keys()) {
            const value = params.get(key);
            if (moment.isMoment(value)) {
                params = params.set(key, moment.utc(value).toISOString());
            }
        }
    }

    return params;
  }

  private isIso8601(value: string) {
    if (value === null || value === undefined) {
      return false;
    }

    return this.iso8601.test(value);
  }
}
