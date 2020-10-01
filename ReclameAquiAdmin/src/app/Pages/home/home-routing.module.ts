import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      toolbarShadowEnabled: true,
      containerEnabled: true
    },
    children: [
      {
        path: 'timeline',
        loadChildren: () => import('./home-visual/home-visual.module').then(m => m.HomeVisualModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
