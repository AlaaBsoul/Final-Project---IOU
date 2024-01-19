import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainService } from '../main.service';
import { IEvent } from '../interfaces';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-unpayment-events-page',
  standalone: true,
  imports: [CommonModule, TableComponent],
  host: { ngSkipHydration: '' },

  templateUrl: './unpayment-events-page.component.html',
  styleUrl: './unpayment-events-page.component.css'
})

export class UnpaymentEventsPageComponent {
  events: IEvent[] = [];
  constructor(private mainSvc: MainService) { }
  ngOnInit(): void {
    this.getEvents();

  }

  getEvents() {
    this.mainSvc.getEvents().subscribe((data: any) => {
      this.events = data.filter((event: IEvent) => event.eventCost === 0);
    })
  }
}