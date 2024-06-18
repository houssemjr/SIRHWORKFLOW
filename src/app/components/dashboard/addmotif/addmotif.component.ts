import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DynamicFormComponent } from '../../../dynamic-form/dynamic-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-addmotif',
  standalone: true,
  imports: [CommonModule,DynamicFormComponent,MatToolbarModule],
  templateUrl: './addmotif.component.html',
  styleUrl: './addmotif.component.css'
})
export class AddmotifComponent implements OnInit{
  apiUrl='http://localhost:9999/motif/add';

 IdEmployee: string | null = null;

 constructor(private authService:AuthService){}
 ngOnInit() {
   this.IdEmployee = this.authService.getLoggedInUserId();
   console.log('Logged in User ID:', this.authService.getLoggedInUserId());
 }
}
