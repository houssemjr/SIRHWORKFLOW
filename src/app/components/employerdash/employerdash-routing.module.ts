import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerdashComponent } from './employerdash.component';
import { InitComponent } from './init/init.component';
import { LeaverequestComponent } from './leaverequest/leaverequest.component';
import { LeavecComponent } from './leavec/leavec.component';
import { ProfileComponent } from './profile/profile.component';
import { HeuresComponent } from './heures/heures.component';
import { UserCardsComponent } from '../dashboard/user-cards/user-cards.component';
import { UpdateProfileComponent } from './updateprofile/updateprofile.component';
import { ProfilecollabComponent } from './profilecollab/profilecollab.component';
import { DemandesortieComponent } from './demandesortie/demandesortie.component';
import { AbsenceComponent } from './absence/absence.component';
import { DemandeencoursComponent } from './demandeencours/demandeencours.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

const routes: Routes = [
  {path:'',component:EmployerdashComponent,children:[
    {path:'',component:AbsenceComponent},
    {path:'leaverequest',component:LeavecComponent},
    {path:'profile',component:ProfileComponent},
    {path:'heures',component:HeuresComponent},
    {path:'usercards',component:UserCardsComponent},
    {path:'updatep',component:UpdateProfileComponent},
    {path:'profilecollab',component:ProfilecollabComponent},
    {path:'demandesortie',component:DemandesortieComponent},
    {path:'absence',component:AbsenceComponent},
    {path:'demandeencours',component:DemandeencoursComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class EmployerdashRoutingModule { }
