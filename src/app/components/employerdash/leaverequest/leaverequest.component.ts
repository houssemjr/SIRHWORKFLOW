import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'primeng/api';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { InitComponent } from '../init/init.component';
import { EmployerdashRoutingModule } from '../employerdash-routing.module';
import { DynamicFormComponent } from "../../../dynamic-form/dynamic-form.component";

@Component({
    selector: 'app-leaverequest',
    standalone: true,
    templateUrl: './leaverequest.component.html',
    styleUrl: './leaverequest.component.css',
    imports: [CommonModule, SharedModule, MatFormFieldModule, MatDatepickerModule, MatSelectModule, RouterModule, InitComponent, EmployerdashRoutingModule, DynamicFormComponent,RouterModule]
})
export class LeaverequestComponent {

}
