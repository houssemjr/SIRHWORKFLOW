import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'primeng/api';
import { DynamicFormService } from '../../services/dynamic-form.service';
import { BrowserModule } from '@angular/platform-browser';

interface FormField {
  key: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
}

@Component({
  selector: 'app-dynamic',
  standalone: true,
  imports: [
    SharedModule, MatCardModule, MatFormFieldModule,
    MatDatepickerModule, CommonModule, ReactiveFormsModule, MatSelectModule, MatInputModule, BrowserModule
  ],
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {
  @Input() formName!: string;
  @Input() apiUrl!: string;
  @Input() IdEmployee!: string | null;
  
  @Input() formFields: FormField[] = [];
  form: FormGroup = this.fb.group({});

  constructor(private dfs: DynamicFormService, private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('Fetching form configuration for', this.formName);
    this.dfs.getFormConfig(this.formName).subscribe(
      (config: FormField[]) => {
        console.log('Form configuration received:', config);
        this.formFields = config;
        this.form = this.dfs.toFormGroup(this.formFields);
      },
      error => {
        console.error('Error loading form configuration:', error);
      }
    );
  }

  onSubmit() {
    if (!this.IdEmployee) {
      console.error('IdEmployee is not available');
      return;
    }

    const formDataWithEmployeeId = {
      ...this.form.value,
      idEmployee: this.IdEmployee
    };

    this.dfs.submitForm(formDataWithEmployeeId, this.apiUrl).subscribe(
      response => {
        console.log('Form submitted successfully:', response);
        alert('Ajouté avec succès');
        this.form.reset();
      },
      error => {
        console.error('Error submitting form:', error);
        alert('' + (error.error.text || error.message));
        this.form.reset();
      }
    );
  }

  getFieldPairs(): FormField[][] {
    const pairs: FormField[][] = [];
    for (let i = 0; i < this.formFields.length; i += 2) {
      pairs.push(this.formFields.slice(i, i + 2));
    }
    return pairs;
  }
}
