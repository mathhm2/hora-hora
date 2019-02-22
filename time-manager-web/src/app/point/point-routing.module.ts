import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointComponent } from './point.component';
import { AuthGuard } from '../core/auth.guard';

const routes: Routes = [
  {
    path: 'point',
    component: PointComponent,
    canActivate: [AuthGuard],
    data: {
      toolbar: true,
      navbar: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PointRoutingModule { }
