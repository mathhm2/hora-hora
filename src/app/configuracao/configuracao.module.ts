import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracaoRoutingModule } from './configuracao-routing.module';
import { ConfiguracaoService } from './configuracao.service';
import { ConfiguracaoComponent } from './configuracao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConfiguracaoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfiguracaoRoutingModule
  ],
  providers: [
    ConfiguracaoService
  ]
})
export class ConfiguracaoModule { }
