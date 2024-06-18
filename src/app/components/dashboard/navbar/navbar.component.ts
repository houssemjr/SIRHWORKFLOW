import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SharedModule } from '../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,SharedModule,MatButtonModule,MatIconModule,RouterModule,KeycloakAngularModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private authservice:AuthService,private kcservice:KeycloakService,private oauth:OAuthService){}

  logout(){
    this.authservice.logout();
    this.oauth.revokeTokenAndLogout();
  }

}
