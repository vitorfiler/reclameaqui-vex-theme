import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CadastroEdificioCondominioComponent } from './cadastro-edificio-condominio.component';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
  {
    path: '',
    component: CadastroEdificioCondominioComponent,
    data: {
      toolbarShadowEnabled: true
    },
    children: [
      {
        path: '',
        redirectTo: 'getting-started'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroEdificioCondominioRoutingModule {
}
