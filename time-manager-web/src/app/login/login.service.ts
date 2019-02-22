import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LoginService {

  api = environment.apiURL;

  constructor(private http: HttpClient) { }

  getLogin(formData) {
    return this.http.post(this.api + '/login', formData);
  }



}
