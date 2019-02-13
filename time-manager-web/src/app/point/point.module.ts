import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { PointRoutingModule } from './point-routing.module';
import { PointComponent } from './point.component';
import { PointService } from './point.service';
import { RegisterPointComponent } from './register-point/register-point.component';
import { RegisterPointService } from './register-point/register-point.service';
import { ViewPointComponent } from './view-point/view-point.component';
import { ViewPointService } from './view-point/view-point.service';


@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    BsDatepickerModule,
    ModalModule,
    PointRoutingModule
  ],
  declarations: [
    PointComponent,
    RegisterPointComponent,
    ViewPointComponent
  ],
  providers: [
    PointService,
    RegisterPointService,
    ViewPointService
  ]
})
export class PointModule { }
