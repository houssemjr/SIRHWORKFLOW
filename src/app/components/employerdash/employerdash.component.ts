import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { LeaverequestComponent } from './leaverequest/leaverequest.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-employerdash',
  standalone: true,
  imports: [SharedModule,CommonModule,RouterModule,LeaverequestComponent,FooterComponent],
  templateUrl: './employerdash.component.html',
  styleUrl: './employerdash.component.css'
})
export class EmployerdashComponent {
  constructor(private authservice:AuthService,private oauth:OAuthService){

  }
  
  
    logouts(){
      console.log(' ')
  
      this.authservice.logout();
      this.oauth.revokeTokenAndLogout();
      console.log('loggedout')
    } 

}
