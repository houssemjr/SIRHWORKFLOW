import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OAuthService } from 'angular-oauth2-oidc';
import { jwtDecode } from 'jwt-decode';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
  
})
export class AuthService {


  private baseUrl = 'http://localhost:8884/login';

  constructor(private http: HttpClient,private jwtHelper: JwtHelperService,private oauthService:OAuthService) {}

  authenticate(loginRequest: any): Observable<any> {
    const url = `${this.baseUrl}/auth`;
    return this.http.post(url, loginRequest);
  }

      getUserToken(): string | null {
        // Retrieve the user token from localStorage
        const token = localStorage.getItem('userToken');
        // Return the token or null if it's not present
        return token || null;
      }
      

      // Add a method to get the user role from the token
      getUserRole(): string | null {
        const token = this.getUserToken();
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
    
                // Extract the user roles from the token using jwt-decode
                const userRoles: string[] = decodedToken?.realm_access?.roles || [];
    
                // Check if the user has the 'mssadmin' role
                if (userRoles.includes('mssadmin')) {
                    return 'mssadmin';
                }
    
                // Check if the user has the 'manager' role
                if (userRoles.includes('manager')) {
                  console.log('this is is a manager');
                    return 'manager';
                }
                if (userRoles.includes('employee')) {
                  console.log('this is is an employee');
                    return 'employee';
                }
    
                // If neither 'mssadmin' nor 'manager' roles are present
                return null;
            } catch (error) {
                console.error('Error decoding token:', error);
                return null;
            }
        }
        return null;
    }
    
      

      saveUserToken(token: string): void {
        // Store the token in localStorage
        localStorage.setItem('userToken', token);
      }
      
      isUserLoggedIn(): boolean {
        // Retrieve the user token from localStorage
        const token = localStorage.getItem('userToken');
        // Check if the token is present and not expired (you may need to adjust the logic based on your token structure)
        return !!token;
      }
      logout(): void {
        // Clear user token from localStorage or perform any additional cleanup
        localStorage.removeItem('userToken');
        //this.kcservice.logout();

    
        // Redirect to the login page
        window.location.href = '/login'; // Use Angular router navigate if you prefer
      }

      userHasRoles(expectedRoles: string[]): boolean {
        // Retrieve user roles from wherever they are stored after login (e.g., localStorage, sessionStorage, etc.)
        const userRoles = this.getUserRolesFromStorage(); // Implement this method to retrieve user roles
        console.log(this.getUserRolesFromStorage())
        console.log(expectedRoles.some(role => userRoles.includes(role)))
        return expectedRoles.some(role => userRoles.includes(role));
        
      }
    
      // Method to retrieve user roles from storage
      getUserRolesFromStorage(): string[] {
        const token = this.getUserToken();
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                // Extract the user roles from the token using jwt-decode
                return decodedToken?.realm_access?.roles || [];
            } catch (error) {
                console.error('Error decoding token:', error);
                return [];
            }
        }
        return [];
          }
          getLoggedInUserId(): string | null {
            const token = localStorage.getItem('userToken');
            if (!token) return null;
            const decodedToken = this.jwtHelper.decodeToken(token);
            return decodedToken.sub; // 'sub' is usually the user ID in the token
          }
          getLoggedInUsername(): string | null {
            const token = this.getUserToken();
            if (!token) return null;
            const decodedToken = this.jwtHelper.decodeToken(token);
            return decodedToken.preferred_username; // Assurez-vous que le token contient 'preferred_username'
          }
          
        
    


     

    }


