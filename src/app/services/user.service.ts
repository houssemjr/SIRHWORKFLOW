import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserDTO } from '../interfaces/userDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private baseUrl = 'http://localhost:8884/api/user'; // Adjust as per your API URL
  private apibaseurl='http://localhost:9999/solde'
  constructor(private http: HttpClient) { }

  getUserById(userId: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.baseUrl}/getuserid/${userId}`);
  }

  getSoldeByIdUser(idUser: string): Observable<any> {
    return this.http.get<any>(`${this.apibaseurl}/getsolde/${idUser}`).pipe(
        catchError(error => {
            console.error('Error fetching solde:', error);
            return throwError(error);
        })
    );



  

}
}
