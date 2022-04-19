import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "../services/cookie.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  @Input() event:{
    id: number,
    name: string,
    description: string,
    location: string,
    date: string,
    image: string} = {} as any;
  @Output() isDisplayTicket = new EventEmitter();

  readonly API: string = 'http://127.0.0.1:5000';
  private authToken: string = '';
  isShowBuyBtn: boolean = false;
  pageLink: string = '';
  isTickets:boolean = false;

  tickets: [{
    id: number,
    price: number,
    status: boolean
  }] = [] as any;

  usersTicketsInfo:[{
    ticket_id:number,
    price:number,
    event_name:string,
    event_date:string

  }] = [] as any;


  constructor(
    private http: HttpClient,
    private location: Location,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.authToken = this.cookie.getAuthToken();
    this.pageLink = this.location.path();

    if(this.pageLink === '/events'){
      this.http.get<[{
        id: number,
        price: number,
        status: boolean
      }]>(this.API + "/ticket/" + this.event.id).subscribe({
        next: (data) => {
          data.forEach((ticket)=>
            this.tickets.push(ticket))

          console.log(this.tickets.length);
          console.log(this.usersTicketsInfo.length);
          this.isTickets = true;
        }
      })

      this.isShowBuyBtn = true;
    }else if(this.pageLink === '/user'){
      this.http.get<[{
        ticket_id: number,
        price: number,
        event_name:string,
        event_date:string
      }]>(this.API + "/ticket/bought",{
        headers: { "Authorization": "Bearer " + this.authToken}
      }).subscribe({
        next: (data)=>{
          data.forEach((ticket)=>
            this.usersTicketsInfo.push(ticket))

          console.log(this.tickets.length);
          console.log(this.usersTicketsInfo.length);
          this.isTickets = true;
        }
      })

      this.isShowBuyBtn = false;
    }
  }

  buyTicket(ticketID: number, event: Event){
    const btn = event.target as HTMLElement;

    this.http.put(this.API+'/ticket/buy/'+ticketID,null,{
      headers: { "Authorization": "Bearer " + this.authToken}
    }).subscribe({
      next: ()=>{
        btn.textContent = 'BOUGHT';
        btn.classList.add('disable-btn');
      }
    })
  }

  close(event:Event): void{
    const el = event.target as HTMLElement;
    if(el.classList.contains('wrapper')){
      this.isDisplayTicket.emit();
    }
    this.isTickets = false;
  }
}
