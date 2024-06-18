import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagersComponent } from './managers.component';
import { InitComponent } from './init/init.component';
import { PermissComponent } from './permiss/permiss.component';
import { AbsencemanagerComponent } from './absencemanager/absencemanager.component';
import { ManagerproComponent } from './managerpro/managerpro.component';
import { ManagerupdateComponent } from './managerupdate/managerupdate.component';

const routes: Routes = [
  {path:'',component:ManagersComponent,children:[
    {path:'',component:AbsencemanagerComponent},
    {path:'permiss',component:PermissComponent},
    {path:'abmanager',component:AbsencemanagerComponent},
    {path:'profile',component:ManagerproComponent},
    {path:'update',component:ManagerupdateComponent},
    {path:'demandencours',component:InitComponent}


  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagersRoutingModule { }
