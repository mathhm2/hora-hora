import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigurationService {

  url = environment.apiURL;

  constructor(private http: HttpClient) { }

  getConfigurationByUser(userID) {
    return this.http.get(this.url + '/configuration/' + userID);
  }

  updateConfiguration(_id, data) {
    return this.http.put(this.url + '/configuration/' + _id, data);
  }

  createConfiguration(data) {
    delete data._id;
    return this.http.post(this.url + '/configuration', data);
  }

}
