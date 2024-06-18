import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import {MatSidenavModule} from '@angular/material/sidenav';
import { KeycloakAngularModule } from 'keycloak-angular';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LeaverequestComponent } from '../employerdash/leaverequest/leaverequest.component';
import { HeuresComponent } from '../employerdash/heures/heures.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,ReactiveFormsModule,MatInputModule,MatProgressSpinnerModule,MatToolbarModule,MatSelectModule,MatButtonModule,
    MatCardModule,MatSidenavModule,KeycloakAngularModule,MatExpansionModule,
    MatTooltipModule,MatSidenavModule,
  MatMenuModule,MatIconModule,MatDividerModule,MatListModule,LeaverequestComponent,HeuresComponent

  ],
  exports:[
    CommonModule,
    MatFormFieldModule,ReactiveFormsModule,MatInputModule,MatProgressSpinnerModule,MatToolbarModule,MatSelectModule,MatButtonModule,
    MatCardModule,MatSidenavModule,KeycloakAngularModule,MatExpansionModule,
    MatTooltipModule,MatSidenavModule,
  MatMenuModule,MatIconModule,MatDividerModule,MatListModule ,LeaverequestComponent,HeuresComponent


  ]
})
export class SharedModule { }
