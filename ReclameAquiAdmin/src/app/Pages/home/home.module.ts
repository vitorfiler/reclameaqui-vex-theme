import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { MatSelectModule } from '@angular/material/select';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PageLayoutModule,
    FlexLayoutModule,
    MatTabsModule,
    IconModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    ScrollingModule,
    MatAutocompleteModule,
    MatTableModule
  ]
})
export class HomeModule {
}
