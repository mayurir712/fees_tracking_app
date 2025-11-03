import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/master/login/login.component';
import { MasterComponent } from '../pages/master/master/master.component';
import { PackageMasterComponent } from '../pages/packageMaster/package-master/package-master.component';

const routes: Routes = [
  { path: '', component: LoginComponent },  // Default route is the login page
  { path: 'master', component: MasterComponent },
  { path: 'package', component: PackageMasterComponent },
  
  { path: '**', redirectTo: '' }  // Redirect any undefined routes to login page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
