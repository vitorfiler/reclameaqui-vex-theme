import { ParceirosCargaComponent } from './pages/parceiros-carga/parceiros-carga.component';
import { ContatosComponent } from './pages/contatos/contatos.component';
import { ParceirosComponent } from './pages/parceiros/parceiros.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';

import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/registro/registro-cliente/register.component';
import { RegistroEmpresaComponent } from './Pages/registro/registro-empresa/registro-empresa.component';

import { EdificiosCondominiosComponent } from './Pages/edificios-condominios/edificios-condominios.component';
import { BairrosAtivosInativosComponent } from './Pages/bairros/bairros-ativos-inativos.component';
import { ImoveisAtivosInativosComponent } from './Pages/imoveis-ativos-inativos/imoveis-ativos-inativos.component';
import { CadastroImovelComponent } from './Pages/cadastro-imovel/cadastro-imovel.component';
import { CadastroParceiroComponent } from './pages/cadastro-parceiro/cadastro-parceiro.component';
import { CadastroXmlComponent } from './pages/cadastro-xml/cadastro-xml.component';
import { UsuariosComponent } from './Pages/usuarios/usuarios.component';
import { CadastroEdificioCondominioComponent } from './Pages/cadastro-edificio-condominio/cadastro-edificio-condominio.component';



const routes: VexRoutes = [
  // {
  //   path: '**', redirectTo:'/home', pathMatch: 'full'
  // },
  // {
  //   path: '',
  //   component: LoginComponent,

  // },
  {
    path: '',
    component: CustomLayoutComponent,
    children: [
      {path:'edificios-condominios', component: EdificiosCondominiosComponent},
      {path:'bairros-ativos', component: BairrosAtivosInativosComponent},
      {path:'bairros-inativos', component: BairrosAtivosInativosComponent},
      {path:'imoveis-ativos', component: ImoveisAtivosInativosComponent},
      {path:'imoveis-inativos', component: ImoveisAtivosInativosComponent},
      {path:'cad-imoveis', component: CadastroImovelComponent},
      {path:'cad-edficios-condominios', component: CadastroEdificioCondominioComponent},
      {path:'cad-parceiro', component: CadastroParceiroComponent},
      {path:'cad-xml', component: CadastroXmlComponent},
      {path:'cad-edficios-condominios', component: CadastroEdificioCondominioComponent},
      {path:'usuarios', component: UsuariosComponent},
      {path:'parceiros', component: ParceirosComponent},
      {path:'contatos', component: ContatosComponent},
      {path:'parceiros-carga', component: ParceirosCargaComponent}
    ]
  },
  {path:'login', component: LoginComponent},
  {path: 'cad-cliente',component: RegisterComponent},
  {path: 'cad-empresa',component: RegistroEmpresaComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {

// preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
