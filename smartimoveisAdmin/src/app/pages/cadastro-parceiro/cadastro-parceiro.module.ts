import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { CadastroParceiroComponent } from './cadastro-parceiro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroParceiroRoutingModule } from './cadastro-parceiro-routing.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [CadastroParceiroComponent],
  imports: [
    CommonModule,
    CadastroParceiroRoutingModule,
    PageLayoutModule,
    FlexLayoutModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class CadastroParceiroModule { }
