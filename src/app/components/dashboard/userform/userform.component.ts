import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DynamicFormComponent } from '../../../dynamic-form/dynamic-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DynamicComponent } from '../../dynamic/dynamic.component';
import { UserProComponent } from '../userpro/userpro.component';
import { AuthService } from '../../../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userform',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,DynamicFormComponent,MatToolbarModule,DynamicComponent,UserProComponent],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.css'
})
export class UserformComponent implements OnInit {

  apiUrl = 'http://localhost:8884/api/user/addus';
  IdEmployee: string | null = null;

  constructor(private authService:AuthService,private http:HttpClient){}
  ngOnInit() {
    this.IdEmployee = this.authService.getLoggedInUserId();
    console.log('Logged in User ID:', this.authService.getLoggedInUserId());
  }
  onSubmit(formData: any) {
    this.http.post(this.apiUrl, formData).subscribe(
      response => {
        console.log('User added successfully', response);
      },
      error => {
        console.error('Error adding user', error);
      }
    );
  }

}
