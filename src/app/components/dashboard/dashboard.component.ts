import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TestcComponent } from '../testc/testc.component';
import { AddroleComponent } from './addrole/addrole.component';
import { OAuthService } from 'angular-oauth2-oidc';
import { KeycloakService } from 'keycloak-angular';
import { AuthService } from '../../auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,CommonModule,SharedModule,RouterModule,TestcComponent,AddroleComponent,MatButtonModule,FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  constructor(private authservice:AuthService,private kcservice:KeycloakService,private oauth:OAuthService){}

  isSidenavOpen = false;

  sidenavOpenedChange(isOpened: boolean) {
    this.isSidenavOpen = isOpened;
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
