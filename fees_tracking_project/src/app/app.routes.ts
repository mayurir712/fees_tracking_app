
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './pages/master/master/master.component';
import { LoginComponent } from './pages/master/login/login.component';


export const routes: Routes = [
    { path: '', component: LoginComponent },  // Default route is the login page
  { path: 'master', component: MasterComponent },  // After login, navigate to master page
  { path: '**', redirectTo: '' }  // Redirect any undefined routes to login page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
