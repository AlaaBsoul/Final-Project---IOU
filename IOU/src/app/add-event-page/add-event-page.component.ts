import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainService } from '../main.service';
import { IEvent, IGuest } from '../interfaces';

declare let Swal: any;

@Component({
  selector: 'app-add-event-page',
  standalone: true,
  host: { ngSkipHydration: '' },
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-event-page.component.html',
  styleUrl: './add-event-page.component.css'
})
export class AddEventPageComponent implements OnInit {

  constructor(private fb: FormBuilder, private mainSvc: MainService) {
    this.eventForm = this.fb.group({

      eventName: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventLocation: ['', Validators.required],
      eventType: ['', Validators.required],
      eventCost: [null, [Validators.required, Validators.min(0)]],
      personalReminders: [''],
      digitalInvitations: [false],
      guestList: this.fb.array([]) // Initialize as an empty array
    });
  }

  ngOnInit(): void {
    this.getEvents()
  }

  allGuestsList: IGuest[] = []
  guestList: any[] = []
  getEvents() {
    this.mainSvc.getEvents().subscribe((data: any) => {
      this.events = data;
      this.allGuestsList = this.getAllGuests(this.events)
      console.log(this.events)
    })
  }

  getAllGuests(events: IEvent[]): IGuest[] {
    let allGuests: IGuest[] = [];
    let uniquePhoneNumbers: Set<string> = new Set(); // To track unique phone numbers

    // Loop through each event
    events.forEach((event: IEvent) => {
      // Check if the event has a guestList and it's an array
      if (event.guestList && Array.isArray(event.guestList)) {
        event.guestList.forEach((guest) => {
          // Check if the guest's phone number is already added to the unique list
          if (guest.phoneNumber && !uniquePhoneNumbers.has(guest.phoneNumber)) {
            uniquePhoneNumbers.add(guest.phoneNumber); // Add new number to the unique list
            allGuests.push(guest); // Add guest to the allGuests array
          }
        });
      }
    });
    console.log(allGuests)
    return allGuests;
  }

  toggleGuestList() {
    this.showGuestList = !this.showGuestList;
  }
  showGuestList: boolean = false;

  addGuestToEventFromOldEvents(name: string, phone: string) {
    this.currentGuestName = name
    this.currentGuestPhoneNumber = phone
    this.addGuestToEvent()
  }

  addGuestToEvent() {
    const exists = this.guestList.some(existingGuest => existingGuest.phoneNumber === this.currentGuestPhoneNumber);

    if (exists) {
      Swal.fire("אורח עם מספר טלפון זה כבר קיים!");
      return;
    }

    if (this.currentGuestName.length === 0 || this.currentGuestPhoneNumber.length === 0) {
      Swal.fire('שגיאה', 'יש למלא שם ומספר טלפון', 'error');
      return;
    }

    if (this.currentGuestName.length < 3) {
      Swal.fire('שגיאה', 'שם האורח חייב להיות באורך מינימום של 3 תווים', 'error');
      return;
    }

    const israeliPhoneRegex = /^05\d([-]{0,1})\d{7}$/;
    if (!israeliPhoneRegex.test(this.currentGuestPhoneNumber)) {
      Swal.fire('שגיאה', 'מספר הטלפון חייב להיות מספר תקין', 'error');
      return;
    }

    // If validations pass, add the guest
    this.guestList.push({
      name: this.currentGuestName,
      phoneNumber: this.currentGuestPhoneNumber,
      confirmationStatus: 'לא נבחר סטטוס'
    });

    // Reset the current guest info
    this.currentGuestName = '';
    this.currentGuestPhoneNumber = '';
  }
  currentGuestName: string = '';
  currentGuestPhoneNumber: string = '';
  eventForm: FormGroup;
  events: IEvent[] = [];
  addEvent() {
    if (this.eventForm.valid) {
      const newEvent = this.eventForm.value;
      newEvent.guestList = this.guestList;
      newEvent.phoneNumberOfCreator = localStorage.getItem("phoneNumber") || ""
      this.mainSvc.addEvent(newEvent).then((res) => {

        this.getEvents();
      });
      this.eventForm.reset();
      this.guestList = []
    } else {
      Object.keys(this.eventForm.controls).forEach(field => {
        const control = this.eventForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  addEventsToServer(event: IEvent) {
    this.mainSvc.addEvent(event).then((res) => {
      this.getEvents()
    })
  }

  deleteEventsFromServer(eventId: string) {
    this.mainSvc.deleteEvent(eventId).then((res) => {
      console.log(res)
      this.getEvents()
    })
  }

  removeGuest(index: number) {
    this.guestList.splice(index, 1); // Remove a guest at the given index
  }
}