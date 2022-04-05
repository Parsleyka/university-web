import { Component, OnInit } from '@angular/core';
import {Emitters} from "../services/emitters";
import {CookieService} from "../services/cookie.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.checkAuth();
  }

  checkAuth(){
    if(this.cookie.getAuthToken()){
      Emitters.authEmitter.emit(true);
    }else {
      Emitters.authEmitter.emit(false);
    }
  }


}
