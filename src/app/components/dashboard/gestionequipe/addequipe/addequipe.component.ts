import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DynamicFormComponent } from '../../../../dynamic-form/dynamic-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../auth.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-addequipe',
  standalone: true,
  imports: [
    CommonModule,
    DynamicFormComponent,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './addequipe.component.html',
  styleUrls: ['./addequipe.component.css']
})
export class AddequipeComponent implements OnInit {
  apiUrl = 'http://localhost:8884/api/user/assignequ';
  apu='http://localhost:8884/api/user/addeq';
  IdEmployee: string | null = null;
  equipes: any[] = [];
  users: any[] = [];
  selectedEquipe: number | null = null;
  selectedUser: number | null = null;

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.IdEmployee = this.authService.getLoggedInUserId();
    console.log('Logged in User ID:', this.authService.getLoggedInUserId());
    this.fetchEquipes();
    this.fetchUsers();
  }

  fetchEquipes(): void {
    this.http.get<any[]>('http://localhost:8884/api/user/getequipes').subscribe(data => {
      this.equipes = data;
    });
  }

  fetchUsers(): void {
    this.http.get<any[]>('http://localhost:8884/api/user/getinfos').subscribe(data => {
      this.users = data;
    });
  }

  assignUserToEquipe(): void {
    if (this.selectedEquipe && this.selectedUser) {
      const url = `${this.apiUrl}/${this.selectedUser}/${this.selectedEquipe}`;
      this.http.post(url, {}).subscribe(response => {
        console.log('User assigned to equipe successfully', response);
        // Handle success (e.g., show a notification or refresh the list)
      }, error => {
        console.error('Error assigning user to equipe', error);
        // Handle error (e.g., show an error message)
      });
    } else {
      console.warn('Selected equipe or user is null');
    }
  }
}
