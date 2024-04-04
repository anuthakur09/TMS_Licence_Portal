import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { LicensesComponent } from './admin/licenses/licenses.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {path: 'users', component: UsersComponent},
  {path: 'licenses/:id', component: LicensesComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
