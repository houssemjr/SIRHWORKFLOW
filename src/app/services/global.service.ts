import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private baseUrl = 'http://localhost:8884/us';
  private userUrl = 'http://localhost:8884/api/user';

  constructor(private http: HttpClient) { }

  getUsernameById(userId: string): Observable<string> {
    const url = `${this.baseUrl}/${userId}/username`;
    return this.http.get(url, { responseType: 'text' });
  }

  getUserByUsername(username: string): Observable<UserInfo> {
    const url = `${this.userUrl}/byUsername/${username}`;
    return this.http.get<UserInfo>(url);
  }
}
