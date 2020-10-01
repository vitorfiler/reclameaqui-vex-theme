import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialTimelineRoutingModule } from './social-timeline-routing.module';
import { SocialTimelineComponent } from './social-timeline.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { SocialTimelineEntryComponent } from './components/social-timeline-entry/social-timeline-entry.component';
import { MatSelectModule } from '@angular/material/select';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMaskModule } from 'ngx-mask';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [SocialTimelineComponent, SocialTimelineEntryComponent],
  imports: [
CommonModule,
    SocialTimelineRoutingModule,
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
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    NgxMaskModule.forRoot(),
    MatDialogModule,
    MatRadioModule
    
  ]
})
export class SocialTimelineModule {
}
