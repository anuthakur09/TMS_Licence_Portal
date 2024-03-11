import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LicenceComponent } from './admin/licence/licence.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SignupComponent } from './admin/signup/signup.component';
import { LoginComponent } from './admin/login/login.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { ToastService } from './toastrService.service';
import { HttpClientModule } from "@angular/common/http";



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LicenceComponent,
    UserManagementComponent,
    UserListComponent,
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
