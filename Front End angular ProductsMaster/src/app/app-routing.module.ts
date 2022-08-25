import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './AuthGuard/auth.guard';
import { CustomerComponent } from './pages/customer/customer.component';
import { LoginComponent } from './pages/login/login.component';
import { MasterListComponent } from './pages/master-list/master-list.component';
import { MasterComponent } from './pages/master/master.component';
import { RegistorComponent } from './pages/registor/registor.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'registor',component:RegistorComponent},
  {path:'master',component:MasterComponent,canActivate:[AuthGuard]},
  {path:'customer',component:CustomerComponent,canActivate:[AuthGuard]},
  {path:"masterlist",component:MasterListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
