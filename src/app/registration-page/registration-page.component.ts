import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthorizationService} from "../services/authorization.service";
import {Emitters} from "../services/emitters";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  form: FormGroup = {} as FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nickname: '',
      name: '',
      surname: '',
      email: '',
      password: ''
    })
  }

  submit(): void{
    this.auth.registration(this.form.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: err => {
        if(err.status === 403){
          alert('Wrong Data');
        }
      }
    })
  }
}
