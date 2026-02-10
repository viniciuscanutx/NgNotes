import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleInfo, faBan } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-modal',
  imports: [
    MatDialogModule, 
    FontAwesomeModule,
    CommonModule,
],
  templateUrl: './dialogModal.html',
  styleUrl: './dialogModal.scss',
})

export class DialogModal {

  iconInfo = faCircleInfo;
  iconBan = faBan;

  constructor(
    public dialogRef: MatDialogRef<DialogModal>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  fechar() {
    this.dialogRef.close();
  }

}