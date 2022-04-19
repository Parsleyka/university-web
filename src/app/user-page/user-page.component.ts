import {Component, Input, OnInit} from '@angular/core';
import {CookieService} from "../services/cookie.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  @Input() isDisplayTicket = false;

  readonly API: string = 'http://127.0.0.1:5000';
  private authToken: string = '';
  isEditable: boolean = false;
  form: FormGroup = {} as FormGroup;


  user: {
    nickname: string,
    name: string,
    surname: string,
    email: string
  } = JSON.parse(this.cookie.getCookie('user'));

  constructor(
    private cookie: CookieService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nickname: this.user.nickname,
      name: this.user.name,
      surname: this.user.surname,
      email: this.user.email
    })
  }

  showTickets():void{
    if(!this.cookie.getAuthToken()) {
      alert("You should be logged")
      return
    }
    this.isDisplayTicket = true;
  }

  close():void{
    this.isDisplayTicket = false;
  }

  changeEditableState(): void {
    this.isEditable = !this.isEditable;
  }

  submit(): void {
    this.authToken = this.cookie.getAuthToken();
    this.http.put(this.API + '/user/update', this.form.getRawValue(), {
      headers: { "Authorization": "Bearer " + this.authToken}
    }).subscribe({
      next: ()=>{
        this.user = this.form.getRawValue();
        this.cookie.setCookie('user',JSON.stringify(this.user), 60);
        this.router.navigate(['/']);
      },
      error: (err => {
        if(err.status === 403){
          alert('Try again!');
        }
      })
    });
  }

}
