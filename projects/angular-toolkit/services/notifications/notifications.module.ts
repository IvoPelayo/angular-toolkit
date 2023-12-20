import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { INotificationService, NotificationService } from './notification.service';
import { AcceptDialogComponent } from './components/accept-dialog/accept-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

export const NOTIFICATION_SERVICE = new InjectionToken<INotificationService>('NOTIFICATION_SERVICE');

@NgModule({
  declarations: [
    AcceptDialogComponent,
    ConfirmDialogComponent
  ],
  imports:  [
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule,
  ]
})
export class NotificationsToolkitModule {
  public static forRoot(): ModuleWithProviders<NotificationsToolkitModule> {
    return {
      ngModule: NotificationsToolkitModule,
      providers: [
        NotificationService,
        { provide: NOTIFICATION_SERVICE, useClass: NotificationService}
      ],
    }
}
}
