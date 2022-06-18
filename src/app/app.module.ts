import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LrPageComponent } from './components/lr-page/lr-page.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { QueryComponent } from './components/query/query.component';
import { DitemComponent } from './components/ditem/ditem.component';

@NgModule({
  declarations: [AppComponent, LrPageComponent, HomeComponent, SearchComponent, QueryComponent, DitemComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
