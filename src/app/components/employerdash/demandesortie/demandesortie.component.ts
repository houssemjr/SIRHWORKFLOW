import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MotifService, Motif } from '../../../services/motif.service';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../auth.service';
import { LeaveService } from '../../../services/leave.service';  // Importez le service de gestion des demandes de congé
import { Leave } from '../../../interfaces/leave.model';

@Component({
  selector: 'app-demandesortie',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './demandesortie.component.html',
  styleUrls: ['./demandesortie.component.css']
})
export class DemandesortieComponent implements OnInit {
  demandeForm: FormGroup;
  motifs: Motif[] = [];
  selectedMotif: Motif | null = null;
  userSolde: number | null = null;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private motifService: MotifService,
    private userService: UserService,
    private authService: AuthService,
    private leaveRequestService: LeaveService
  ) {
    this.demandeForm = this.fb.group({
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      message: [''],
      justificatif: [null]
    });
  }

  ngOnInit(): void {
    this.motifService.fetchAll().subscribe(data => {
      this.motifs = data;
    });

    this.userId = this.authService.getLoggedInUserId();
  }

  onMotifChange(event: any): void {
    const selectedTitre = event.value;
    this.selectedMotif = this.motifs.find(motif => motif.titre === selectedTitre) || null;

    if (this.selectedMotif && this.userId) {
      this.userService.getSoldeByIdUser(this.userId).subscribe(solde => {
        if (selectedTitre.toLowerCase().includes('permission')) {
          this.userSolde = solde.soldeheure;
        } else if (selectedTitre.toLowerCase().includes('maladie')) {
          this.userSolde = solde.soldemaladie;
        } else {
          this.userSolde = solde.soldeconge;
        }
      });
    } else {
      this.userSolde = null;
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.demandeForm.patchValue({ justificatif: file });
  }

  onSubmit(): void {
    if (this.demandeForm.valid) {
      const leaveRequest: Leave = {
        ...this.demandeForm.value,
        idEmployee: this.userId  // Assurez-vous que IdEmployee est assigné
      };

      console.log('Leave Request:', leaveRequest); // Vérifiez si IdEmployee est bien assigné

      this.leaveRequestService.submitLeaveRequest(leaveRequest).subscribe(response => {
        console.log('Leave request submitted', response);
        this.snackBar.open('Demande de congé envoyée avec succès', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }, error => {
        console.error('Error submitting leave request', error);
        this.snackBar.open('Erreur lors de l\'envoi de la demande de congé', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top'
        });
      });
    } else {
      this.snackBar.open('Veuillez remplir tous les champs requis', 'Fermer', {
        duration: 3000,
        verticalPosition: 'top'
      });
    }
  }
}

