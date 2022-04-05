import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  API: string = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {
  }

  login(loginData: { email: string, password: string }) {
    return this.http.post<{
      access_token: string,
      user: {
        id: number,
        nickname: string,
        name: string,
        surname: string,
        email: string,
        permissions: string
      }
    }>(this.API + '/user/login', loginData);
  }

  registration(regData:{
    nickname: string,
    name: string,
    surname: string,
    email: string,
    password: string
  }){
    return this.http.post(this.API + '/user/create', regData);
  }

  logout(){
    return this.http.post(this.API + '/user/logout', {});
  }
}
