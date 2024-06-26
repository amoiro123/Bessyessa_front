import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { ProtectedComponent } from './Authentication/protected/protected.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './Authentication/services/auth.interceptor';
import { AuthService } from './Authentication/services/auth.service';
import { RouterModule } from '@angular/router';
import { UserComponent } from './Users/user/user.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { EditUserComponent } from './Users/edit-user/edit-user.component';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProtectedComponent,
    UserComponent,
    EditUserComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    TableModule,
    ButtonModule,
    MenubarModule,
    DialogModule,
    AvatarModule,
    AvatarGroupModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
