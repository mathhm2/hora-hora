import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracaoComponent } from './configuracao.component';
import { AuthGuard } from '../core/auth.guard';

const routes: Routes = [
  {
    path: 'configuracao',
    component: ConfiguracaoComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracaoRoutingModule { }
