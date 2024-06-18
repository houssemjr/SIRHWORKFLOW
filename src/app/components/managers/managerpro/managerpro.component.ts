import { Component } from '@angular/core';
import { ProfilecollabComponent } from '../../employerdash/profilecollab/profilecollab.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managerpro',
  standalone: true,
  imports: [ProfilecollabComponent],
  templateUrl: './managerpro.component.html',
  styleUrl: './managerpro.component.css'
})
export class ManagerproComponent {

}
