import { Component } from '@angular/core';
import { DynamicFormComponent } from "../../../dynamic-form/dynamic-form.component";
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { EmployerdashRoutingModule } from '../employerdash-routing.module';
import { InitComponent } from '../init/init.component';
import { AuthService } from '../../../auth.service';
import { DynamicFormService } from '../../../services/dynamic-form.service';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-heures',
    standalone: true,
    templateUrl: './heures.component.html',
    styleUrl: './heures.component.css',
    imports: [DynamicFormComponent,MatToolbarModule]
})
export class HeuresComponent {
  apiUrl = 'http://localhost:9999/startpermission';
  IdEmployee: string | null = null;
  constructor (private dynamicFormService:DynamicFormService,private authService:AuthService){
    this.IdEmployee = this.authService.getLoggedInUserId();

}
ngOnInit() {
  this.IdEmployee = this.authService.getLoggedInUserId();
  console.log('Logged in User ID:', this.authService.getLoggedInUserId());
}
}
