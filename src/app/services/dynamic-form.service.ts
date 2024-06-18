  import { Injectable } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class DynamicFormService {
    constructor(private fb: FormBuilder, private http: HttpClient) {}

    getFormConfig(formName: string): Observable<any> {
      return this.http.get(`/assets/forms/${formName}-form.json`);
    }

    toFormGroup(fields: any[]): FormGroup {
      const group: any = {};

      fields.forEach(field => {
        group[field.key] = field.required ? this.fb.control('', Validators.required) : this.fb.control('');
      });

      return this.fb.group(group);
    }

    submitForm(formData: any, apiUrl: string): Observable<any> {
      return this.http.post(apiUrl, formData);
    }

  }
