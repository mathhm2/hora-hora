import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  listaBancoHoras: any[];

  constructor(public authService: AuthService, private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.dashboardService.getBancoHoras()
      .subscribe((listaBancoHoras) => {
        this.listaBancoHoras = listaBancoHoras.map(data => {
          return {
            id: data.payload.doc.id, ...data.payload.doc.data()
          }
        });
      });
  }

}
