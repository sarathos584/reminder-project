import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReminderListComponent } from './components/reminder-list/reminder-list.component';

import { EditFormComponent } from './components/edit-form/edit-form.component';
const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'reminder-list',component:ReminderListComponent},
  {path:'edit',component:EditFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
