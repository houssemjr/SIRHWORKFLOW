import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TestcComponent } from './components/testc/testc.component';
import { AuthGuard } from './auth.guard';
import { OrganigrammeComponent } from './components/organigramme/organigramme.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { BpmnModelerComponent } from './components/dashboard/bpmn-modeler/bpmn-modeler.component';
import { AbsenceDashboardComponent } from './components/dashboard/absence-dashboard/absence-dashboard.component';

export const routes: Routes = [
 {path:'',redirectTo:'login',pathMatch:'full'},   
 {path:'login',component:LoginComponent},
 {path:'dashboard',loadChildren: ()=>import('./components/dashboard/dashboard.module').then(x =>x.DashboardModule),canActivate:[AuthGuard],data:{expectedRoles:['mssadmin']}},
 {path:'employerdash',loadChildren:()=>import('./components/employerdash/employerdash.module').then(y=>y.EmployerdashModule),canActivate:[AuthGuard],data:{expectedRoles:['employee']}},
 {path:'managersdash',loadChildren:()=>import('./components/managers/managers.module').then(z=>z.ManagersModule),canActivate:[AuthGuard],data:{expectedRoles:['manager']}},
 {path:'test',component:TestcComponent},
 {path:'organigramme',component:OrganigrammeComponent},
 {path:'unauthorized',component:UnauthorizedComponent},
 {path:'des',component:AbsenceDashboardComponent},

 {path:'**',redirectTo:'login',pathMatch:'full'}

];
