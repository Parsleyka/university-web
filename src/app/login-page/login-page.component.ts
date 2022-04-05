import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "../services/cookie.service";
import {Router} from "@angular/router";
import {AuthorizationService} from "../services/authorization.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup = {} as FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService,
    private auth: AuthorizationService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    })
  }

  submit(): void {
    this.auth.login(this.form.getRawValue()).subscribe({
      next: (data) => {
        this.cookie.setCookie('access_token', data['access_token'],60);
        this.cookie.setCookie('user', JSON.stringify(data['user']), 60);
        this.router.navigate(['/']);
      },
      error: (err => {
        if(err.status === 403){
          alert('Wrong Data');
        }
      })
    });
  }
}
