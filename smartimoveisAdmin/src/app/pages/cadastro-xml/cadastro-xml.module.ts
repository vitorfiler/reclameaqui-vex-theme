import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroXmlRoutingModule } from './cadastro-xml-routing.module';
import { CadastroXmlComponent } from './cadastro-xml.component';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [CadastroXmlComponent],
  imports: [
    CommonModule,
    CadastroXmlRoutingModule,
    PageLayoutModule,
    FlexLayoutModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatGridListModule,
    ScrollingModule
  ]
})
export class CadastroXmlModule { }