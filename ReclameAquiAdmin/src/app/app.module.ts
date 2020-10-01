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
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CategoriaRenderizadaComponent } from './Pages/Categoria/categoria-renderizada/categoria-renderizada.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { HomeComponent } from './Pages/home/home.component';
import { IconModule } from '@visurel/iconify-angular';
import { RankingComponent } from './Pages/ranking/ranking.component';
import { TodasCategoriasComponent } from './Pages/Categoria/todas-categorias/todas-categorias.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgxScrollTopModule } from 'ngx-scrolltop';

@NgModule({
  declarations: [AppComponent, CategoriaRenderizadaComponent,HomeComponent, RankingComponent, TodasCategoriasComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
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
    // Vex
    VexModule,
    CustomLayoutModule,
    NgxScrollTopModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
