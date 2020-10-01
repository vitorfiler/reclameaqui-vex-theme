import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';
import { CadastroCategoriaComponent } from './Pages/Categoria/cadastro-categoria/cadastro-categoria.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegistroEmpresaComponent } from './Pages/registro/registro-empresa/registro-empresa.component';
import { CategoriaRenderizadaComponent } from './Pages/Categoria/categoria-renderizada/categoria-renderizada.component';
import { HelpCenterComponent } from './Pages/help-center/help-center.component';
import { SocialComponent } from './Pages/social/social.component';
import { SocialTimelineComponent } from './Pages/social/social-timeline/social-timeline.component';
import { HomeComponent } from './Pages/home/home.component';
import { HomeVisualComponent } from './Pages/home/home-visual/home-visual.component';
import { RankingComponent } from './Pages/ranking/ranking.component';
import { SocialTimelineEmpresaComponent } from './Pages/social/social-timeline-empresa/social-timeline-empresa.component';
import { TodasCategoriasComponent } from './Pages/Categoria/todas-categorias/todas-categorias.component';
import { RegisterComponent } from './Pages/registro/registro-cliente/register.component';


const routes: VexRoutes = [
  {
    path: '',
    component: CustomLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        children: [
          {
            path: 'init',
            component: HomeVisualComponent
          },
        ]
      },
      { 
        path: 'cadcliente', 
        component: RegisterComponent 
      },
      { 
        path: 'cadempresa', 
        component: RegistroEmpresaComponent 
      },
      {
        path: 'ranking',
        component: RankingComponent
      },
      {
        path: 'todas-categorias',
        component: TodasCategoriasComponent
      },
      {
        path: 'categoria',
        component: CadastroCategoriaComponent
      },
      //ecommerce
      {
        path: 'informatica',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'eletroeletronicos',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'eletroportateis',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'moda-feminina',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'eletrodomesticos',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'celulares-smartphones',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'calcados-femininos',
        component: CategoriaRenderizadaComponent
      },
      //turismoelazer
      {
        path: 'agencia-viagens',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'aluguel-carros',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'companhias-aereas',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'empresas-ingressos',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'parques-diversao',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'redes-hoteis',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'resorts',
        component: CategoriaRenderizadaComponent
      },
      //AlimentoseBebidas
      {
        path: 'bebidas',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'bebidas-alcoolicas',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'bomboniere',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'congelados',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'laticinios-lacteos',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'matinais',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'mercearia',
        component: CategoriaRenderizadaComponent
      },
      //Bancos e Cartões
      {
        path: 'bancos',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'cartoes-beneficios',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'cartoes-credito',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'consorcios',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'financeiras',
        component: CategoriaRenderizadaComponent
      },
      //Beleza e Estética
      {
        path: 'cabelos',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'corpo-banho',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'higiene-limpeza',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'maos-pes',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'maquiagem',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'perfumarias',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'suplementos-alimentares',
        component: CategoriaRenderizadaComponent
      },
      //Casas e construção
      {
        path: 'chuveiros-aquecedores',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'ferramentas-maquinas',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'iluminacao-eletrica',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'loucas-metais',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'materiais-construcao',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'pisos-laminados',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'tintas-acessorios',
        component: CategoriaRenderizadaComponent
      },

      //Educação
      {
        path: 'autoescolas',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'cursos-idiomas',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'cursos-vestibulares-concursos',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'cursos-tecnicos-prof',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'escolas',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'livros',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'universidades-faculdades',
        component: CategoriaRenderizadaComponent
      },
      //Mae e bebe
      {
        path: 'acessorios-bebe',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'artigo-bebe',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'brinquedos-jogos',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'buffet-infantil',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'corpo-inf',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'moveis-infantis',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'troca-fraldas',
        component: CategoriaRenderizadaComponent
      },
      //Moda
      {
        path: 'acessorios-vestuario',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'bolsas-malas',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'calcados-femininos',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'calcados-masculinos',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'moda-feminina',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'moda-masculina',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'relogios',
        component: CategoriaRenderizadaComponent
      },
      //Moveis e Decoracao
      {
        path: 'colchoes',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'decoracao',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'moveis-geral',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'moveis-modulados',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'moveis-planejados',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'papel-adesivos',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'persianas-cortinas',
        component: CategoriaRenderizadaComponent
      },
      //Saúde
      {
        path: 'clinicas-medicas',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'equip-medicos',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'exames-lab',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'farmacias',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'hospitais',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'industria-farmaceutica',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'planos-saude',
        component: CategoriaRenderizadaComponent
      },
      //Telefonia, Tv e Celular
      {
        path: 'provedores-servidores',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'telefonia-celular',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'telefonia-fixa',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'tv-assinatura',
        component: CategoriaRenderizadaComponent
      },
      //Veículos e acessórios
      {
        path: 'acessorios-carros',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'acessorios-motos',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'autopecas',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'concessionarias-carros',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'fabricantes-carros',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'lojas-carros',
        component: CategoriaRenderizadaComponent
      },
      {
        path: 'pneus',
        component: CategoriaRenderizadaComponent
      },
      //-----
      {
        path: 'reclamar',
        component: HelpCenterComponent
      },
      {
        path: 'perfil', redirectTo: '/perfil/timeline', pathMatch: 'full'
      },
      {
        path: 'perfil',
        component: SocialComponent,
        children: [
          {
            path: 'timeline',
            component: SocialTimelineComponent
          },
          {
            path: 'empresa',
            component: SocialTimelineEmpresaComponent
          },
        ]
      },

    ]
  },
  {
    path: 'login', component: LoginComponent,
    // children: [
    //   {
    //     path: 'cad-cliente',
    //     component: RegisterComponent
    //   },
    //   {
    //     path: 'cad-empresa',
    //     component: RegisterComponent
    //   }
    // ]
  },
  //{ path: '', redirectTo: '/home/init', pathMatch: 'full' },
  { path: '**', redirectTo: '/home/init' }
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
