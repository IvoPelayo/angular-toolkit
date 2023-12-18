import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogResponse } from './components/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AcceptDialogComponent } from './components/accept-dialog/accept-dialog.component';
import { AcceptOptions, ConfirmOptions, IAcceptOptions, IConfirmOptions, NotificationType } from './notification.types';

@Injectable()
export class NotificationService {

  constructor(
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  /** Displays a popup message at the top right corner of the page
   * defaultTitle and defaultMessage can be passed to override missing translation errors
   * titleParams and messageParams can be used to show custom text inside the message template
   */
  showToast(
    message: string,
    type: NotificationType = NotificationType.Bare,
    action?: string,
    messageParams?: any,
    timeOut: number = 3500): Observable<boolean> {
        const toast = this.snackBar.open(this.translate.instant(message, messageParams), action ? this.translate.instant(action) : undefined, {
            duration: timeOut,
            panelClass: 'snackbar-' + type.toString(),
            horizontalPosition: 'end',
            verticalPosition: 'top',
        });

        return toast.onAction().pipe(map(() => true));
  }

  /** Display a prompt dialog with basic Yes/No response
   *  To see more about dialog check the ConfirmDialogComponent class
   */
   presentConfirm(options?: IConfirmOptions): Observable<any> {
    options = new ConfirmOptions(options);

    const notificationRef = this.dialog.open(ConfirmDialogComponent, {
        width: options.width,
        role: 'alertdialog',
        data: options,
        disableClose: true,
    });

    return notificationRef.afterClosed()
        .pipe(
            map((result: ConfirmDialogResponse) => {
                if(result === ConfirmDialogResponse.Declined) {
                    throw(result);
                }

                return result;
            })
        );

    }

  /** Display a prompt dialog with only Accept option
   *  To see more about dialog check the AcceptDialogComponent class
   */
  presentMessage(options?: IAcceptOptions): Observable<any> {
      options = new AcceptOptions(options);

      const notificationRef = this.dialog.open(AcceptDialogComponent, {
          width: options.width,
          role: 'alertdialog',
          data: options,
          disableClose: true,
      });

      return notificationRef.afterClosed();
  }
}

