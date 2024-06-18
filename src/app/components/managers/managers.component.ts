import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { ManagersModule } from './managers.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { KeycloakAngularModule } from 'keycloak-angular';
import { AuthService } from '../../auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-managers',
  standalone: true,
  imports: [CommonModule,SharedModule,RouterModule,     MatFormFieldModule,ReactiveFormsModule,MatInputModule,MatProgressSpinnerModule,MatToolbarModule,MatSelectModule,MatButtonModule,
    MatCardModule,MatSidenavModule,KeycloakAngularModule,MatExpansionModule,
    MatTooltipModule,MatSidenavModule,
  MatMenuModule,MatIconModule,MatDividerModule,MatListModule,MatBadgeModule
 
    
],
  templateUrl: './managers.component.html',
  styleUrl: './managers.component.css'
})
export class ManagersComponent {

  constructor(private authservice:AuthService,private oauth:OAuthService){

  }

  logouts(){
    console.log('loggedout1')

    this.authservice.logout();
    this.oauth.revokeTokenAndLogout();
    console.log('loggedout')
  } 
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

}
