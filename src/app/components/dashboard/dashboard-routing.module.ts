import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InitComponent } from './init/init.component';
import { EmployeesComponent } from './employees/employees.component';
import { ReportsComponent } from './reports/reports.component';
import { AddroleComponent } from './addrole/addrole.component';
import { AssignroleComponent } from './assignrole/assignrole.component';
import { LeaverhComponent } from './leaverh/leaverh.component';
import { PermissComponent } from '../managers/permiss/permiss.component';
import { BpmnModelerComponent } from './bpmn-modeler/bpmn-modeler.component';
import { AbsenceDashboardComponent } from './absence-dashboard/absence-dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { UserformComponent } from './userform/userform.component';
import { UserProComponent } from './userpro/userpro.component';
import { AddmotifComponent } from './addmotif/addmotif.component';
import { UserCardsComponent } from './user-cards/user-cards.component';
import { GestioncollabComponent } from './gestioncollab/gestioncollab.component';
import { GestionmotifComponent } from './gestionmotif/gestionmotif.component';
import { RoleajoutComponent } from './roleajout/roleajout.component';
import { AddequipeComponent } from './gestionequipe/addequipe/addequipe.component';
import {GestionequipeComponent}from './gestionequipe/gestionequipe.component'
import { GestionworkflowComponent } from './gestionworkflow/gestionworkflow.component';
import { GestionDiagramComponent } from './gestiondiagram/gestiondiagram.component';
import { AddwfComponent } from './gestionworkflow/addwf/addwf.component';
import { OrgchartComponent } from './orgchart/orgchart.component';
import { OrganigrammeComponent } from '../organigramme/organigramme.component';
import { CalendrierRHComponent } from './calendrier-rh/calendrier-rh.component';


const routes: Routes = [
  {path:'',component:DashboardComponent,children: [
    {path:'',component:AbsenceDashboardComponent},
    {path:'employees',component:EmployeesComponent},
    {path:'reports',component:ReportsComponent},
    {path:'addrole',component:AddroleComponent},
    {path:'assignrole',component:AssignroleComponent},
    {path:'rhleaves',component:LeaverhComponent},
    {path:'designer',component:BpmnModelerComponent},
    {path:'tests',component:AbsenceDashboardComponent},
    {path:'calendar',component:InitComponent},
    {path:'userform',component:UserformComponent},
    {path:'addmotif',component:AddmotifComponent},
    {path:'usercards',component:UserCardsComponent},
    {path:'collabs',component:GestioncollabComponent},
    {path:'gmotif',component:GestionmotifComponent},
    {path:'roles',component:RoleajoutComponent},
    {path:'addequipe',component:AddequipeComponent},
    {path:'gequipes',component:GestionequipeComponent},
    {path:'gwf',component:GestionworkflowComponent},
    {path:'gdiag',component:GestionDiagramComponent},
    {path:'addwf',component:AddwfComponent},
    {path:'orgchart',component:OrgchartComponent},
    {path:'organigramme',component:OrganigrammeComponent},
    {path:'calend',component:CalendrierRHComponent},
    

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
