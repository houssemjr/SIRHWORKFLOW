import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DfService {

  constructor(private fb: FormBuilder) {}

  getFormConfig(formName: string): Observable<any[]> {
    // Simule une requête HTTP retournant la configuration du formulaire
    const config = [
      { "key": "username", "label": "Username", "type": "text", "required": true },
      { "key": "nom", "label": "Nom", "type": "text", "required": true },
      { "key": "prenom", "label": "Prenom", "type": "text", "required": true },
      { "key": "cin", "label": "CIN", "type": "text", "required": true },
      { "key": "telephone", "label": "Telephone", "type": "text", "required": true },
      { "key": "adresse", "label": "Adresse", "type": "text", "required": true },
      { "key": "sitf", "label": "Situation familiale", "type": "text", "required": true },
      { "key": "email", "label": "Email", "type": "text", "required": true },
      { "key": "genre", "label": "Genre", "type": "text", "required": true }
    ];
    return of(config);
  }

  toFormGroup(fields: any[]): FormGroup {
    const group: any = {};
    fields.forEach(field => {
      group[field.key] = field.required ? this.fb.control('', Validators.required) : this.fb.control('');
    });
    return this.fb.group(group);
  }

  submitForm(data: any, apiUrl: string): Observable<any> {
    // Simule une soumission de formulaire
    console.log('Submitting form to', apiUrl, 'with data', data);
    return of({ success: true });
  }

}
