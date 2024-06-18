import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Leave } from '../interfaces/leave.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {


  private apiUrl = 'http://localhost:9999/manager/leaverequests'; // Adaptez selon votre URL de base
  private appUrl = 'http://localhost:9999/leave/leaverequest';

  constructor(private http: HttpClient) {}

  getAllLeaves(): Observable<Leave[]> { // Type de retour à spécifier selon votre modèle
    return this.http.get<Leave[]>(this.apiUrl);
  }

  processLeaveDecision(leaveId: string, decision: string, id:number) {
    const url = `http://localhost:9999/manager/process-leave/${leaveId}/${id}`;
    return this.http.post(url, { decision: decision });
  }
  getall():Observable<Leave[]>{
    return this.http.get<Leave[]>(`http://localhost:9999/leave/getallleaves`);
  }
  submitLeaveRequest(leaveRequest: any): Observable<any> {
    console.log('Submitting Leave Request:', leaveRequest); // Vérifiez si IdEmployee est bien envoyé

    return this.http.post(this.appUrl, leaveRequest);
  }

  getDailyAbsenceRate(): Observable<{ present: number, absent: number }> {
    return this.http.get<{ present: number, absent: number }>(`${this.apiUrl}/daily-absence-rate`);
  }


}
