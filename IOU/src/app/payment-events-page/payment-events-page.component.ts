import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IEvent } from '../interfaces';
import { MainService } from '../main.service';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-payment-events-page',
  standalone: true,
  imports: [CommonModule, TableComponent],
  host: { ngSkipHydration: '' },

  templateUrl: './payment-events-page.component.html',
  styleUrl: './payment-events-page.component.css'
})

export class PaymentEventsPageComponent implements OnInit {
  events: IEvent[] = [];
  constructor(private mainSvc: MainService) { }
  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.mainSvc.getEvents().subscribe((data: any) => {
      this.events = data.filter((event: IEvent) => event.eventCost !== 0);
    })
  }
}