import { Observable } from 'rxjs';

export interface FormDataServiceInterface {
  insertData(data: any): Observable<any>;
  submitForm(data: any, apiUrl: string): Observable<any>;
}
