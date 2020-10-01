import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatTableModule } from '@angular/material/table';
import { HomeVisualRoutingModule } from './home-visual-routing.module';
import { HomeVisualEntryComponent } from './components/home-entry.component';
import { HomeVisualComponent } from './home-visual.component';
import { NgxScrollTopModule } from 'ngx-scrolltop';


@NgModule({
  declarations: [HomeVisualComponent, HomeVisualEntryComponent],
  imports: [
    CommonModule,
    HomeVisualRoutingModule,
    FlexLayoutModule,
    MatTabsModule,
    MatIconModule,
    IconModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    ScrollingModule,
    MatTableModule,
    NgxScrollTopModule
  ]
})
export class HomeVisualModule {
}
