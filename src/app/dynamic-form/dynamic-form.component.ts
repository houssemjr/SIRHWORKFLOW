  import { Component, Input, OnInit, QueryList, ViewChildren, viewChildren } from '@angular/core';
  import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm } from '@angular/forms';
  import { DynamicFormService } from '../services/dynamic-form.service';
  import { SharedModule } from 'primeng/api';
  import { MatCardModule } from '@angular/material/card';
  import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
  import { MatDateSelectionModel, MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
  import { CommonModule } from '@angular/common';
  import { ReactiveFormsModule } from '@angular/forms';
  import { FormBuilder } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';


  

  @Component({
    selector: 'app-dynamic-form',
    standalone: true,
    imports: [    SharedModule, MatCardModule, MatFormFieldModule,
      MatDatepickerModule, CommonModule, ReactiveFormsModule,MatSelectModule,MatInputModule,MatDatepickerModule,MatRadioModule
  ],
    templateUrl: './dynamic-form.component.html',
    styleUrl: './dynamic-form.component.css'
  })
  export class DynamicFormComponent implements OnInit {

    @Input() formName !: string;
    @Input() apiUrl!: string;
    @Input() IdEmployee!: string | null;  
    formFields: any[]=[];
    @Input() formFieldss: any[] = []; 
    form: FormGroup = this.fb.group({}); 
    
    constructor(private dfs: DynamicFormService,private fb: FormBuilder) {}

    ngOnInit(): void {
      this.dfs.getFormConfig(this.formName).subscribe(
        config => {
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
        return; // Optionally handle this case more gracefully
      }
    
      // Append IdEmployee to the form's data
      const formDataWithEmployeeId = {
        ...this.form.value,
        idEmployee: this.IdEmployee  // Ensure this key matches what your backend expects
      };
    
      this.dfs.submitForm(formDataWithEmployeeId, this.apiUrl).subscribe(
        response => {
          console.log('Formulaire soumis avec succès:', response);
          alert('Ajouté avec succès');
          this.form.reset();
        },
        error => {
          console.error('Erreur lors de la soumission du formulaire:', error);
          // Ici, nous montrons simplement le message d'erreur dans une alerte
          alert('' + (error.error.text || error.message));
          this.form.reset();
        }
      );
      
    }
    

    
  
  } 
