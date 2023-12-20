import { Injectable, inject } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { retryWhen, mergeMap, delay } from 'rxjs/operators';

import { InjectionToken } from '@angular/core';


export interface RetryInterceptorConfig {
    count: number,
    delay: number
}

export const RETRY_INTERCEPTOR_CONFIG = new InjectionToken<RetryInterceptorConfig>('retryConfig',
  {
    providedIn: 'root',
    factory: () => {
      return { count: 3, delay: 1000 } as RetryInterceptorConfig;
    },
  }
);

/**
 * Angular http interceptor used display error messages on the UI
 */
@Injectable()
export class RetryInterceptor implements HttpInterceptor {

    private retryConfig: RetryInterceptorConfig = inject(RETRY_INTERCEPTOR_CONFIG);

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retryWhen(errors =>
              errors.pipe(
                mergeMap((error, count) => {
                  if (count <= (this.retryConfig.count) &&  request.method === 'GET') {
                    return of(error);
                  }

                  return throwError(() => error);
                }),
                delay(this.retryConfig.delay)
              )
            ),

        );
    }
}
