import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocialTimelineEmpresaComponent } from './social-timeline-empresa.component';


const routes: Routes = [
  {
    path: '',
    component: SocialTimelineEmpresaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialTimelineEmpresaRoutingModule {
}
