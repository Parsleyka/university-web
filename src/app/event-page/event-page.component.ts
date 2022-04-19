import { Component, OnInit, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "../services/cookie.service";

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})

export class EventPageComponent implements OnInit {
  @Input() isDisplayTicket = false;

  readonly API: string = 'http://127.0.0.1:5000';

  eventForDisplay:{
    id: number,
    name: string,
    description: string,
    location: string,
    date: string,
    image: string}={} as any;

  events: [{
    id: number,
    name: string,
    description: string,
    location: string,
    date: string,
    image: string
  }] = [] as any;

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.http.get<[{
      id: number,
      name: string,
      description: string,
      location: string,
      date: string,
      image: string
    }]>
    (this.API + "/event").subscribe({
      next: (data) => {
        data.forEach((event)=>{
          this.events.push(event);
        })
      }
    })
  }

  showTickets(event:{}):void{
    if(!this.cookie.getAuthToken()) {
      alert("You should be logged")
      return
    }
    this.isDisplayTicket = true;
    this.eventForDisplay = event as any;
  }

  close():void{
    this.isDisplayTicket = false;
  }
}
