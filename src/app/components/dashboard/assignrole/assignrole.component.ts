import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assignrole',
  standalone: true,
  imports: [SharedModule,CommonModule],
  templateUrl: './assignrole.component.html',
  styleUrl: './assignrole.component.css'
})
export class AssignroleComponent {

}
