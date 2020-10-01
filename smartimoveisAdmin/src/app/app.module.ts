import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';

import { IconModule } from '@visurel/iconify-angular';

import { NgxMaskModule } from 'ngx-mask';
import { EdificiosCondominiosComponent } from './Pages/edificios-condominios/edificios-condominios.component';
import { RegistroImoveisComponent } from './Pages/registro/registro-imoveis/registro-imoveis.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { BairrosAtivosInativosComponent } from './Pages/bairros/bairros-ativos-inativos.component';
import { ImoveisAtivosInativosComponent } from './Pages/imoveis-ativos-inativos/imoveis-ativos-inativos.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UsuariosComponent } from './Pages/usuarios/usuarios.component';
import { ParceirosComponent } from './pages/parceiros/parceiros.component';
import { ContatosComponent } from './pages/contatos/contatos.component';
import { ParceirosCargaComponent } from './pages/parceiros-carga/parceiros-carga.component';

@NgModule({
  declarations: [
    AppComponent,
    EdificiosCondominiosComponent,
    BairrosAtivosInativosComponent, 
    RegistroImoveisComponent, 
    ImoveisAtivosInativosComponent, 
    ImoveisAtivosInativosComponent, 
    UsuariosComponent, ParceirosComponent, ContatosComponent, ParceirosCargaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatSnackBarModule,
    ScrollingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    IconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatTableModule,
    NgxMaskModule.forRoot(),
    MatPaginatorModule,
    MatInputModule,
    MatCheckboxModule,
    MatGridListModule,
    // Vex
    VexModule,
    CustomLayoutModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
