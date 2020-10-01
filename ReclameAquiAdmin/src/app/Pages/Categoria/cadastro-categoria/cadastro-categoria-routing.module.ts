import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroCategoriaComponent } from './cadastro-categoria.component';


const routes: Routes = [
  {
    path: '',
    component: CadastroCategoriaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroCategoriaRoutingModule {
}
