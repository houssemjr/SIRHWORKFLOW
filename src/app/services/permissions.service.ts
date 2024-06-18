import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private apiUrl = 'http://localhost:9999/gettasks';
  private approveUrl = 'http://localhost:9999/approve';
  private rejectUrl ='http://localhost:9999/rejected'


  constructor(private http:HttpClient) { }

  getRhTasks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  approvePermission(taskId: string): Observable<string> {
    return this.http.post<string>(`${this.approveUrl}/${taskId}`, null); 
  }

  RejectPermission(taskId:string):Observable<string>{
    return this.http.post<string>(`${this.rejectUrl}/${taskId}`,null)
  }
}
