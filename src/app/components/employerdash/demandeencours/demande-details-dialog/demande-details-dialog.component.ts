import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Leave } from '../../../../interfaces/leave.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-demande-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog-container">
      <div class="dialog-header">
        <h2>Détails de la Demande</h2>
        <button mat-icon-button (click)="onClose()">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <div class="dialog-content">
        <p><strong>Type:</strong> {{ data.leaveType }}</p>
        <p><strong>Début:</strong> {{ data.startDate | date:'shortDate' }}</p>
        <p><strong>Fin:</strong> {{ data.endDate | date:'shortDate' }}</p>
        <p><strong>Message:</strong> {{ data.message }}</p>
      </div>
      <div class="dialog-actions">
        <button mat-button mat-dialog-close>Fermer</button>
      </div>
    </div>
  `,
  styleUrls: ['./demande-details-dialog.component.css']
})
export class DemandeDetailsDialog {


  
  constructor(@Inject(MAT_DIALOG_DATA) public data: Leave,
    public dialogRef: MatDialogRef<DemandeDetailsDialog>
  


  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
