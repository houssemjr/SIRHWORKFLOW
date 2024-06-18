import { Component, OnInit } from '@angular/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { KeycloakService } from 'keycloak-angular';
import { SharedModule } from '../shared/shared.module';
import { LoginRequest } from '../../interfaces/lg';
import { AuthService } from '../../auth.service';
import { KeycService } from '../../services/keyc.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,MatDividerModule, MatIconModule,ReactiveFormsModule
  ,MatSnackBarModule,MatProgressSpinnerModule,CommonModule,SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit {

  form:FormGroup ;
  loading= false  ;
  currentUser: string | undefined;

  constructor(private fb:FormBuilder,private _snack:MatSnackBar,private router:Router,private oauthservice:OAuthService,private kcservice:KeycloakService,private authservice:AuthService,private userService:KeycService){
    this.form=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]

    })
    
    
    
  }
    ngOnInit(): void {
      if (this.authservice.isUserLoggedIn()) {
        console.log('logged')
        // If the user is logged in, redirect to the dashboard or any desired route
      //  this.router.navigate(['dashboard']);
      this.checkUserRole();
       }
  
      console.log("l i d est ",this.authservice.getLoggedInUserId());
      console.log( this.oauthservice.getAccessToken())  
      
    }
    login() {
      const loginRequest = this.form.value;
      this.authservice.authenticate(loginRequest).subscribe(
        (response: any) => {
          // Gérer la réponse du service backend
          if (response.status === 'success') {
            // Authentification réussie, utiliser le jeton d'accès
            const accessToken = response.accessToken;
            const idToken = this.kcservice.getKeycloakInstance()?.idToken;  
          
            const userRoles: string[] = (idToken as any)?.resource_access?.yourClientID?.roles || [];

           console.log( this.oauthservice.getAccessToken())
    
            
            console.log('success'+response.accessToken)
                console.log('id token : ---'+userRoles+'ss');
            // ...
          } else {
            // Authentification échouée, gérer en conséquence
            // ...
          }
        },
        (error) => {
          // Gérer les erreurs de la requête
          console.error('Error during authentication:', error);
        }
      );
    }
  error(){
    this._snack.open('Invalid Username Or Password','',{
      duration:500,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    })
  }
  fakelogin(){
    this.loading=true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 1500);
  }
  
 
  logind(): void {
    // Check if the form is valid
    if (this.form.invalid) {
      return;
    }
  
    // Set loading to true to show spinner
    this.loading = true;
  
    // Extract username and password from the form
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
  
    // Perform the login using the Resource Owner Password Credentials (ROPC) flow
    this.oauthservice.fetchTokenUsingPasswordFlow(username, password)
      .then((tokenResponse) => {
        // Login successful, perform any additional actions if needed
        console.log('Login successful');
  
        // Extract the access token from the token response
        const userToken = tokenResponse.access_token;
  
        // Save the user token to localStorage
        this.authservice.saveUserToken(userToken);
  
        // Check the user's role
        this.checkUserRole();
      })
      .catch((error) => {
        // Handle login error
        console.error('Login error:', error);
      })
      .finally(() => {
        // Set loading to false after login attempt
        this.loading = false;
      });
  }
  
  
  checkUserRole(): void {
    // Assume you have a method to retrieve the user's role from your authentication service.
    const userToken = this.authservice.getUserToken();
    //console.log('User Token:', userToken);
    // Decode the user token to inspect its content
    const userRole = this.authservice.getUserRole();
    
    console.log(userRole)
    // Check the user's role
    if (userRole ==='mssadmin') {
      console.log(userRole);
      // If the user has the role 'mssadmin', perform fake login
      console.log("njareb");
      this.fakelogin();
    } else {
      if(userRole=='manager'){
        console.log('manager redirection')
        this.router.navigate(['managersdash']);

      }else {
        if (userRole=='employee') {
          console.log('employee redirections');
        this.router.navigate(['employerdash'])
        }
        else {
      console.log(userRole)}

      console.log("n est pas un mssadmin")
      // If the user has a different role, log the role
    //  console.log(`User has role: ${userRole}`);
      // Perform other actions based on the role if needed
    }
  }
  




  
  
  

}}
