import { ModuleWithProviders, NgModule } from '@angular/core';
import { NotificationService } from './notification.service';
import { AcceptDialogComponent } from './components/accept-dialog/accept-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

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
      ],
    }
}
}
