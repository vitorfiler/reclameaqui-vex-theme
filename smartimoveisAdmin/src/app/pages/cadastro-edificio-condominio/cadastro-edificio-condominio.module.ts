import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroEdificioCondominioRoutingModule } from './cadastro-edificio-condominio-routing.module';
import { CadastroEdificioCondominioComponent } from './cadastro-edificio-condominio.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '@visurel/iconify-angular';
import { MatRippleModule } from '@angular/material/core';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [CadastroEdificioCondominioComponent],
  imports: [
    CommonModule,
    CadastroEdificioCondominioRoutingModule,
    PageLayoutModule,
    FlexLayoutModule,
    MatButtonModule,
    IconModule,
    MatRippleModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    FormsModule,
    MatAutocompleteModule,
    NgxMaskModule.forRoot(),
    MatIconModule,
  ]
})
export class CadastroEdificioCondominioModule {
}
