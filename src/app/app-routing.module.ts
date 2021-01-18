import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './pages/form/form.component';
import { PagesComponent } from './pages/pages.component';
import { SuccessComponent } from './pages/success/success.component';

const routes: Routes = [
  {path:'', component:PagesComponent, children:[
    {path:'', component:FormComponent},
    {path:'success', component:SuccessComponent},
  ]},
 
  { path:'**',redirectTo:'', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
