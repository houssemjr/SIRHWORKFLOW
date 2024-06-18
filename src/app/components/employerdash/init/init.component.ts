import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { LeaverequestComponent } from "../leaverequest/leaverequest.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { KeycService } from '../../../services/keyc.service';
import { DynamicFormComponent } from "../../../dynamic-form/dynamic-form.component";
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileComponent } from '../profile/profile.component';

@Component({
    selector: 'app-init',
    standalone: true,
    templateUrl: './init.component.html',
    styleUrl: './init.component.css',
    imports: [CommonModule, SharedModule, MatToolbarModule, MatFormFieldModule, MatDatepickerModule, MatSelectModule, RouterModule, LeaverequestComponent, DynamicFormComponent,ProfileComponent]
})
export class InitComponent {
  currentUser: string | undefined;
  leaveForm: FormGroup;


  constructor(private userService:KeycService,private httpClient: HttpClient, private formBuilder: FormBuilder){

    this.leaveForm = this.formBuilder.group({
      startDate: [''], // Champs pour la date de début
      endDate: [''],   // Champs pour la date de fin
      reason: ['']     // Champs pour la raison
    });


  }
  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      data => {
        this.currentUser = data;
      },
      error => {
        console.error('Error fetching user info:', error);
      }
    );
    console.log("test"+this.currentUser);
    
  }


  submitLeaveRequest() {
    const leaveRequestData = this.leaveForm.value;
    this.httpClient.post<any>('http://localhost:9999/leave/leaverequest', leaveRequestData)
      .subscribe(
        response => {
          console.log('Demande de congé envoyée avec succès:', response);
          // Réinitialiser le formulaire ou effectuer d'autres actions après l'envoi réussi
        },
        error => {
          console.error('Erreur lors de l\'envoi de la demande de congé:', error);
          // Gérer les erreurs ici
        }
      );
  }



}
