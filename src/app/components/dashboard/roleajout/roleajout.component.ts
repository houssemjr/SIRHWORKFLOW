import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DynamicFormComponent } from '../../../dynamic-form/dynamic-form.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../../auth.service';
import { DynamicFormService } from '../../../services/dynamic-form.service';
import { HttpClient } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-roleajout',
  standalone: true,
  imports: [  CommonModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,DynamicFormComponent,MatSnackBarModule],
  templateUrl: './roleajout.component.html',
  styleUrl: './roleajout.component.css'
})
export class RoleajoutComponent implements OnInit{
 

  apiUrl='http://localhost:8884/api/user/add-role';
  IdEmployee: string | null = null;
  users: any[] = [];
  roles: any[] = [];
  selectedUser: number | null = null;
  selectedRole: number | null = null;


  constructor (private dynamicFormService:DynamicFormService,private authService:AuthService,private http:HttpClient){
    this.IdEmployee = this.authService.getLoggedInUserId();
  }

  ngOnInit(): void {
    this.IdEmployee = this.authService.getLoggedInUserId();
    console.log('Logged in User ID:', this.authService.getLoggedInUserId());
    this.fetchUsers();
    this.fetchRoles();

  }

  fetchUsers(): void {
    this.http.get<any[]>('http://localhost:8884/api/user/getinfos').subscribe(data => {
      this.users = data;
    });
  }

  fetchRoles(): void {
    this.http.get<any[]>('http://localhost:8884/api/user/GetallRoles').subscribe(data => {
      this.roles = data;
    });
  }

  assignRole(): void {
    if (this.selectedUser && this.selectedRole) {
      const url = `http://localhost:8884/api/user/assignrl/${this.selectedUser}/${this.selectedRole}`;
      this.http.post(url, {}).subscribe(response => {
        console.log('Rôle assigné avec succès', response);
        this.openSuccessSnackBar('Rôle assigné avec succès');
      }, error => {
        console.error('Erreur lors de l\'assignation du rôle', error);
      });
    } else {
      console.error('Utilisateur ou rôle non sélectionné');
    }
  }
  
  openSuccessSnackBar(message: string): void {
    this.openSuccessSnackBar(message); // Appel de votre méthode existante
  }
}  