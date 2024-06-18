import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule,FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'primeng/api';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-dsform',
  standalone: true,
  imports: [
    SharedModule, MatCardModule, MatFormFieldModule,
    MatDatepickerModule, CommonModule, ReactiveFormsModule,
    MatSelectModule, MatInputModule, MatDatepickerModule,
    MatRadioModule, MatCheckboxModule
  ],
  templateUrl: './dsform.component.html',
  styleUrls: ['./dsform.component.css']
})
export class DsformComponent implements OnChanges {
  @Input() formName: string = '';
  @Input() apiUrl: string = '';
  @Input() IdEmployee: string | null = null;
  @Input() formFields: any[] = [];

  form: FormGroup = this.fb.group({});
  submitLabel: string = 'Soumettre';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formFields']) {
      this.initializeForm();
    }
  }

  initializeForm() {
    this.form = this.fb.group({});
    this.formFields.forEach(field => {
      const validators = this.getValidators(field.validation);
      this.form.addControl(field.name, this.fb.control('', validators));
    });
    console.log('Form Controls:', this.form.controls); // Log the form controls
  }

  getValidators(validation: any): any[] {
    const validators: any[] = [];
    if (validation?.required) {
      validators.push(Validators.required);
    }
    if (validation?.minLength) {
      validators.push(Validators.minLength(validation.minLength));
    }
    if (validation?.maxLength) {
      validators.push(Validators.maxLength(validation.maxLength));
    }
    return validators;
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const motifId = formValue.motifId;
      console.log('Form Value:', formValue); // Log the form value

      if (motifId) {
        const urlWithMotifId = `${this.apiUrl}/${motifId}`;
        this.http.post(urlWithMotifId, formValue).subscribe(
          response => {
            console.log('Form submitted successfully', response);
          },
          error => {
            console.error('Error submitting form', error);
          }
        );
      } else {
        console.error('motifId is undefined');
      }
    } else {
      console.error('Form is invalid');
    }
  }
}
