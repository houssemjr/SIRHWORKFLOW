import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerdashRoutingModule } from './employerdash-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../../auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { LeaverequestComponent } from './leaverequest/leaverequest.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmployerdashRoutingModule,
    SharedModule,
    LeaverequestComponent,
    
  ]
})
export class EmployerdashModule {


 }
