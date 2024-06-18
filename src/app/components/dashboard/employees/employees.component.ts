import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SharedModule } from '../../shared/shared.module';
import { MatOptionModule } from '@angular/material/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeycService } from '../../../services/keyc.service';
import { AuthService } from '../../../auth.service';
import { OAuthService } from 'angular-oauth2-oidc';


@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule,SharedModule,MatFormFieldModule,MatOptionModule,SidebarComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  
  form: FormGroup;
 constructor(private kcservice: KeycService, private fb: FormBuilder,private auth:AuthService,private oauth:OAuthService){
  this.form = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
    emailId: ['', [Validators.required, Validators.email]],
  });

 }
 

  addEmployee(){
    if (this.form.invalid) {
      // Handle form validation errors if needed
      return;
    }
    
    const userDTO = this.form.value;

    this.kcservice.addEmployee(userDTO).subscribe(
      (response) => {
        console.log('Employee added successfully:', response);
        // Handle success, e.g., show a success message
      },
      (error) => {
        console.error('Error adding employee:', error);
        // Handle error, e.g., show an error message
      }
    );
  }
  logouts(){
    console.log('loggedout1')

    this.auth.logout();
    this.oauth.revokeTokenAndLogout();
    console.log('loggedout')
  } 

  }


