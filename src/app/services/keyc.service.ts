import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { UserDTO } from '../interfaces/userDTO';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class KeycService {

  private apiUrl = 'http://localhost:8884/api/user'; // Update with your actual API URL
  private baseUrl = 'http://localhost:8884';

  

  constructor(private http: HttpClient,private authservice:AuthService) {}
  addEmployee(userDTO: UserDTO): Observable<any> {
    const token = this.authservice.getUserToken();
    console.log('Token:', token);
 
    const headers = new HttpHeaders({
       'Authorization': `Bearer ${token}`
    });
 
    console.log('Headers:', headers);
 
    return this.http.post<any>(this.apiUrl, userDTO, { headers })
       .pipe(
          catchError((error) => {
             console.error('Error in addEmployee:', error);
             return throwError(error);
          })
       );
 }

 getCurrentUser(){
   return this.http.get<string>(`${this.baseUrl}/userinfo`);
}

getCurrentUsero(): Observable<UserDTO> {
   const token = this.authservice.getUserToken();
   const headers = new HttpHeaders({
     'Authorization': `Bearer ${token}`
   });

   return this.http.get<UserDTO>(`${this.baseUrl}/userinfo`, { headers }).pipe(
     catchError(error => {
       console.error('Error fetching user details:', error);
       return throwError(() => new Error('Failed to fetch user details'));
     })
   );
 }

 getLoggedInUserID(): Observable<string> {
   return this.getCurrentUsero().pipe(
     map(user => {
       if (!user.sub) {
         throw new Error('User ID not available');
       }
       return user.sub;
     }),
     catchError(error => {
       console.error('Error retrieving user ID:', error);
       return throwError(() => new Error('Failed to retrieve user ID'));
     })
   );
 }



 

} 