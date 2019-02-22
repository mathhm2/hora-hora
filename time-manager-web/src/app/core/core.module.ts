import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavBarComponent, ToolbarComponent],
  exports: [NavBarComponent, ToolbarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [AuthService]
})
export class CoreModule { }
