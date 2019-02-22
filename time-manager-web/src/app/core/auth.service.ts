import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  url = environment.apiURL;
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(this.url + '/login', { email, password })
      .pipe(map(user => {
        if (user && user['token']) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }


}
