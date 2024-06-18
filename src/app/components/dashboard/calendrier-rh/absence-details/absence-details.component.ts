import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-absence-details',
  templateUrl: './absence-details.component.html',
  styleUrls: ['./absence-details.component.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class AbsenceDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<AbsenceDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
