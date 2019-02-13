import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class RegisterPointService {
  url = environment.apiURL;
  constructor(private http: HttpClient) { }

  /**
   * Obtem [ TimeBank ] do usuario com base _id do timabank
   * 
   * @param _id // ID do timeBank
   */
  getTimeBankBy_ID(_id) {
    return this.http.get(this.url + '/timeBank/' + _id);
  }

  createTimeBank(dataForm) {
    return this.http.post(this.url + '/timeBank', this.auxTimeBankMongo(dataForm));
  }

  updateTimeBank(dataForm) {
    return this.http.put(this.url + '/timeBank/' + dataForm._id, this.auxTimeBankMongo(dataForm));
  }

  // REFORMA ARRAY
  auxTimeBankMongo(dataForm) {
    const auxDate = new Date(dataForm.date);
    const dateTimeBank =
      (auxDate.getDate() < 10 ? '0' + auxDate.getDate() : auxDate.getDate()) + '/'
      + ((auxDate.getMonth() + 1) < 10 ? '0' + (auxDate.getMonth() + 1) : (auxDate.getMonth() + 1)) + '/'
      + auxDate.getFullYear();

    const timeBank = {
      _id: dataForm._id,
      date: [dateTimeBank],
      hours: {
        startJourney: dataForm.startJourney,
        pauseJourney: dataForm.pauseJourney,
        backJourney: dataForm.backJourney,
        endJourney: dataForm.endJourney
      },
      workedHours: "00:00",
      balanceHours: "00:00",
      lack: dataForm.lack,
      userId: dataForm.userId
    }
    return timeBank;
  }

}
