import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  HomeVisualComponent } from './home-visual.component';


const routes: Routes = [
  {
    path: '',
    component: HomeVisualComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeVisualRoutingModule {
}
