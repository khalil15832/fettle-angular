import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LrPageComponent } from './components/lr-page/lr-page.component';
import { HomeComponent } from './components/home/home.component';
import { DitemComponent } from './components/ditem/ditem.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login-register', component: LrPageComponent },
  { path: 'disease/:id', component: DitemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
