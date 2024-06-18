import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { LeaveService } from '../../../services/leave.service';
import { Leave } from '../../../interfaces/leave.model';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../interfaces/userDTO';
import { NumberInput } from '@angular/cdk/coercion';

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [SharedModule,MatGridListModule,MatCardModule],
  templateUrl: './init.component.html',
  styleUrl: './init.component.css'
})
export class InitComponent  implements OnInit{
   longtext='votre solde de conge est de : ' ;
   soldeConge: number = 20;
   soldePermissions: number = 3;
   leaves: Leave []=[];
constructor(private leaveService:LeaveService,private userService:UserService){}
ngOnInit() {
  this.fetchLeaves();
}
fetchLeaves() {
  this.leaveService.getAllLeaves().subscribe({
  
    next: (leaves: Leave[]) => {
      this.leaves = leaves;
      this.leaves.forEach(leave => {
        console.log(leave);
        if (leave.idEmployee) {
          this.userService.getUserById(leave.idEmployee).subscribe({
            next: (user: UserDTO) => {
              leave.user = user;
              console.log(user); // Check user data in console
            },
            error: (err) => console.error('Error fetching user:', err)
          });
        }
      });
    },
    error: (err) => console.error('Error fetching leaves:', err)
  });
}


handleDecision(instanceid: string, decision: string,id:number) {
  this.leaveService.processLeaveDecision(instanceid, decision,id).subscribe({
    next: (response) => {
      console.log('Decision processed:', response);
      this.fetchLeaves(); // Refresh the list of leaves
    },
    error: (error) => console.error('Error processing decision:', error)
  });
}







}
