import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  private apiUrl = 'http://localhost:9999/wf/wfetchall';
  private baseUrl = 'http://localhost:9999/wf';
  private appUrll='http://localhost:9999/wf'


  constructor(private http: HttpClient) { }

  getWorkflows(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  assignDiagramToWorkflow(workflowId: number, diagramId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/assignDiagram/${workflowId}/${diagramId}`, {});
  }

  getAllDiagrams(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:9999/api/diagrams/fetchall');
  }
  getWorkflowById(id: number): Observable<any> {
    return this.http.get<any>(`${this.appUrll}/get/${id}`);
  }


}
