import {Component, OnInit} from '@angular/core';
import {Emitters} from "../services/emitters";
import {AuthorizationService} from "../services/authorization.service";
import {Router} from "@angular/router";
import {CookieService} from "../services/cookie.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  authenticated: boolean = false;
  url: string = '';


  constructor(
    private auth: AuthorizationService,
    private cookie: CookieService,
    private router: Router,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    )

    this.checkAuth();

    this.location.onUrlChange((path) => {
      this.url = path;
    })
  }

  checkAuth(){
    if(this.cookie.getAuthToken()){
      Emitters.authEmitter.emit(true);
    }else {
      Emitters.authEmitter.emit(false);
    }
  }

  logout(): void {
    this.auth.logout().subscribe({
      next: () => {
        this.cookie.clearCookie('access_token');
        this.cookie.clearCookie('user');
        Emitters.authEmitter.emit(false);
        this.router.navigate(['/']);
      },
      error: err => {
        alert('Try again');
      }
    })
  }
}
