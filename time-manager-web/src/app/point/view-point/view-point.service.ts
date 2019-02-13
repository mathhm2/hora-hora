import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ViewPointService {

  url = environment.apiURL;

  constructor(private http: HttpClient) { }

  /**
   * Obtem LIST [ TimeBank ] do usuario com base no MES e ANO 
   * 
   * @param userID // ID do usuario
   * @param month_year // Mes/Ano | 01/2019
   */
  getTimeBankByUserAndDate(userID, month_year) {
    return this.http.get(this.url + '/timeBank/month/user/' + userID + '?date=' + month_year);
  }

  configClass(Type: number): string {
    switch (Type) {
      case 1:
        return 'positivo';
      case 2:
        return 'negativo';
      case 3:
        return 'desativado';
      case 4:
        return 'desativadoMes';
      case 5:
        return 'day';
      case 6:
        return 'pendente';
      default:
        return 'desativado';
    }
  }

  weekDay(Type: number): string {
    switch (Type) {
      case 0:
        return 'sunday';
      case 1:
        return 'monday';
      case 2:
        return 'tuesday';
      case 3:
        return 'fourth';
      case 4:
        return 'fifth';
      case 5:
        return 'friday';
      case 6:
        return 'saturday';
      default:
        return 'saturday';
    }
  }

}
