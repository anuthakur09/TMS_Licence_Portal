import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SignupComponent } from './admin/signup/signup.component';
import { LoginComponent } from './admin/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import {   NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UsersComponent } from './admin/users/users.component';
import { LicensesComponent } from './admin/licenses/licenses.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    SignupComponent,
    LoginComponent,
    UsersComponent,
    LicensesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
