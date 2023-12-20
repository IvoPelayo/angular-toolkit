import {Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AcceptOptions } from '../../notification.types';


@Component({
  selector: 'app-accept-dialog',
  templateUrl: './accept-dialog.component.html',
})
export class AcceptDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AcceptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AcceptOptions) {}
}



