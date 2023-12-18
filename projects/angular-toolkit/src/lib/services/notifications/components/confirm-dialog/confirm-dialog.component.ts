import {Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmOptions } from '../../notification.types';

export enum ConfirmDialogResponse {
  Accepted = 'accept',
  Declined = 'decline',
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent{
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmOptions) {}

    onAccept() {
      this.dialogRef.close(ConfirmDialogResponse.Accepted);
    }

    onDecline() {
      this.dialogRef.close(ConfirmDialogResponse.Declined);
    }
}



