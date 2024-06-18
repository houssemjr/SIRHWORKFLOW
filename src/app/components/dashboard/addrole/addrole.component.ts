import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-addrole',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './addrole.component.html',
  styleUrl: './addrole.component.css'
})
export class AddroleComponent {
  form: any;
  kcservice: any;
  addEmployee(){
    if (this.form.invalid) {
      // Handle form validation errors if needed
      return;
    }
    
    const userDTO = this.form.value;

    this.kcservice.addEmployee(userDTO).subscribe(
      (response: any) => {
        console.log('Employee added successfully:', response);
        // Handle success, e.g., show a success message
      },
      (error: any) => {
        console.error('Error adding employee:', error);
        // Handle error, e.g., show an error message
      }
    );
  }


  }




