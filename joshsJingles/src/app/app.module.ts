import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { Error404Component } from './components/error404/error404.component';
import { GlobalValuesService } from './services/global-values.service';
import { UserDataService } from './services/user-data.service';
import { FirebaseService } from './services/firebase.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AppLayoutComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    GlobalValuesService,
    UserDataService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
