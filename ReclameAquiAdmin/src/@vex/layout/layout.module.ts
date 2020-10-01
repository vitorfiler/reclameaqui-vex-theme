import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProgressBarModule } from '../components/progress-bar/progress-bar.module';
import { SearchModule } from '../components/search/search.module';
import { MatIconModule } from '@angular/material/icon';
import { NgxScrollTopModule } from 'ngx-scrolltop';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    ProgressBarModule,
    SearchModule,
    MatIconModule,
    NgxScrollTopModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule {
}
