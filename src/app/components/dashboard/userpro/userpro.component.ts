import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-userpro',
  templateUrl: './userpro.component.html',
  styleUrls: ['./userpro.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule
  ]
})
export class UserProComponent {
  userForm: FormGroup;

  equipes = ['Équipe A', 'Équipe B', 'Équipe C'];
  managers = ['Manager 1', 'Manager 2', 'Manager 3'];
  roles = ['Role 1', 'Role 2', 'Role 3'];
  diplomes = ['Ingénieur', 'Licence'];
  seniorites = ['0-2', '2-5', '5-10', '10+'];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      poste: ['', Validators.required],
      equipe: ['', Validators.required],
      manager: ['', Validators.required],
      role: ['', Validators.required],
      matricule: ['', Validators.required],
      dateRecrutement: ['', Validators.required],
      diplome: ['', Validators.required],
      seniorite: ['', Validators.required],
      anciennete: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }
}
