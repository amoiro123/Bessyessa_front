import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { ProtectedComponent } from './Authentication/protected/protected.component';
import { UserComponent } from './Users/user/user.component';
import { EditUserComponent } from './Users/edit-user/edit-user.component';
import { PageComponent } from './page/page.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'protected', component: ProtectedComponent },
  { path: 'user', component: UserComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
  { path: 'page', component: PageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
