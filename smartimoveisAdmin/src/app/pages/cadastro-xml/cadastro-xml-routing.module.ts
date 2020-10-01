import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CadastroXmlComponent } from './cadastro-xml.component';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';


const routes: VexRoutes = [
  {
    path: '',
    component: CadastroXmlComponent,
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
export class CadastroXmlRoutingModule {
}
