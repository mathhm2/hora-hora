import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipModule } from 'ngx-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { ConfigurationService } from './configuration.service';

@NgModule({
  declarations: [
    ConfigurationComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    FontAwesomeModule,
    FormsModule,
    TooltipModule,
    NgxMaskModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ConfigurationService
  ]
})
export class ConfigurationModule { }
