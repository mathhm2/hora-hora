import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from './dashboard.service';
import { BancoHora } from '../shared/models/banco-hora.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // ICONS
  faClock = faClock;

  // Dados
  bancoHora: BancoHora;

  constructor(public authService: AuthService, private dashboardService: DashboardService) {

  }

  ngOnInit() {
    this.dashboardService.readBancoHora().subscribe(hora => {
      this.bancoHora = hora.map(data => {
        return {
          id: data.payload.doc.id, ...data.payload.doc.data()
        };
      });
    });
  }
}
