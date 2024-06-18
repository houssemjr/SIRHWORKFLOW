import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { DynamicFormComponent } from '../../../dynamic-form/dynamic-form.component';
import { LeaverequestComponent } from '../leaverequest/leaverequest.component';
import { DynamicFormService } from '../../../services/dynamic-form.service';
import { KeycService } from '../../../services/keyc.service';
import { AuthService } from '../../../auth.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-leavec',
  standalone: true,
  imports: [CommonModule, SharedModule, MatToolbarModule, MatFormFieldModule, MatDatepickerModule, MatSelectModule, RouterModule, LeaverequestComponent, DynamicFormComponent],
  templateUrl: './leavec.component.html',
  styleUrl: './leavec.component.css',


})
export class LeavecComponent {
  apiUrl = 'http://localhost:9999/leave/leaverequest';
  IdEmployee: string | null = null;

  constructor (private dynamicFormService:DynamicFormService,private authService:AuthService){
    this.IdEmployee = this.authService.getLoggedInUserId();
  }

  ngOnInit() {
    this.IdEmployee = this.authService.getLoggedInUserId();
    console.log('Logged in User ID:', this.authService.getLoggedInUserId());
  }

  }


