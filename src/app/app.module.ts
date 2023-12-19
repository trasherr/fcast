import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Form, ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MaterialModule } from 'src/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddColumnsComponent } from './components/add-columns/add-columns.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    DashboardComponent,
    AddColumnsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }