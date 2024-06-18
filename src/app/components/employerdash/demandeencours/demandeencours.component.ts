import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LeaveService } from '../../../services/leave.service';
import { Leave } from '../../../interfaces/leave.model';
import { AuthService } from '../../../auth.service';
import { DemandeDetailsDialog } from './demande-details-dialog/demande-details-dialog.component';

@Component({
  selector: 'app-demandesencours',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './demandeencours.component.html',
  styleUrls: ['./demandeencours.component.css']
})
export class DemandeencoursComponent implements OnInit {
  demandesEnCours: Leave[] = [];

  constructor(
    private leaveService: LeaveService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getLoggedInUserId();
    this.leaveService.getall().subscribe((leaves: Leave[]) => {
      this.demandesEnCours = leaves.filter(leave => leave.idEmployee === userId && !leave.state);
    });
  }

  getMotifColor(demande: Leave): string {
    return demande.motifleave?.couleur || 'grey';
  }

  voirDetails(demande: Leave): void {
    const dialogRef = this.dialog.open(DemandeDetailsDialog, {
      width: '400px',
      data: demande
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
