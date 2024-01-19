import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainService } from '../main.service';
import { IEvent } from '../interfaces';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-my-created-events',
  standalone: true,
  imports: [CommonModule, TableComponent],
  host: { ngSkipHydration: '' },
  templateUrl: './my-created-events.component.html',
  styleUrl: './my-created-events.component.css'
})
export class MyCreatedEventsComponent {
  events: IEvent[] = [];
  constructor(private mainSvc: MainService) { }
  ngOnInit(): void {
    this.getEvents();

  }

  getEvents() {
    this.mainSvc.getEvents().subscribe((data: any[]) => {
      const phoneNumber = localStorage.getItem("phoneNumber"); // retrieve the phone number from local storage
      if (phoneNumber) {
        this.events = data.filter((event: IEvent) => event.phoneNumberOfCreator === phoneNumber);
      } else {
        console.log("Phone number not found in localStorage");
      }
    });
  }
  changeEvent() {
  }
  sendRemniderToClient() {
  }

}