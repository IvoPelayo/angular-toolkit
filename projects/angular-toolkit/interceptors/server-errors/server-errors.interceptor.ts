import { Inject, Injectable, Optional } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { INotificationService, NOTIFICATION_SERVICE, NotificationType } from '@ivo-pealyo/angular-toolkit/src/lib/services/notifications';

/**
 * Angular http interceptor used display error messages on the UI
 */
@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {
    constructor(@Optional() @Inject(NOTIFICATION_SERVICE) private notifications: INotificationService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
              if(this.notifications) {
                this.notifications.showToast(
                  this.getMessageToDisplay(error) as string,
                  NotificationType.Error,
                );
              }


              return throwError(() => error);
            })
        );
    }

    getMessageToDisplay(error: HttpErrorResponse): string {
        return error?.message ?? 'server-error';
    }
}
