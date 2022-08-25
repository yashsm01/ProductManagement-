import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MasterComponent } from './pages/master/master.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistorComponent } from './pages/registor/registor.component';
import { MasterListComponent } from './pages/master-list/master-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    CustomerComponent,
    LoginComponent,
    RegistorComponent,
    MasterListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
