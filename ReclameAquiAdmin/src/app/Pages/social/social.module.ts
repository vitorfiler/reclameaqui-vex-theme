import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialRoutingModule } from './social-routing.module';
import { SocialComponent } from './social.component';
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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [SocialComponent],
  imports: [
    CommonModule,
    SocialRoutingModule,
    PageLayoutModule,
    FlexLayoutModule,
    MatTabsModule,
    IconModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    ScrollingModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    NgxMaskModule.forRoot(),
  ]
})
export class SocialModule {
}
