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
export class ToolkitNotificationsModule {
  public static forRoot(): ModuleWithProviders<ToolkitNotificationsModule> {
    return {
      ngModule: ToolkitNotificationsModule,
      providers: [
        NotificationService,
        { provide: NOTIFICATION_SERVICE, useClass: NotificationService}
      ],
    }
}
}
