import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { SocialTimelineEmpresaEntryComponent } from './components/social-timeline-entry/social-timeline-empresa-entry.component';
import { MatSelectModule } from '@angular/material/select';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatTableModule } from '@angular/material/table';
import { SocialTimelineEmpresaRoutingModule } from './social-timeline-empresa-routing.module';
import { SocialTimelineEmpresaComponent } from './social-timeline-empresa.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [SocialTimelineEmpresaComponent, SocialTimelineEmpresaEntryComponent],
  imports: [
    CommonModule,
    SocialTimelineEmpresaRoutingModule,
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
    MatTooltipModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    FormsModule,
  ]
})
export class SocialTimelineEmpresaModule {
}
