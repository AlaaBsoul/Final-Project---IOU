import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChatComponent } from '../chat/chat.component';
import { IEvent, IGuest, IMessage } from '../interfaces';
import { MainService } from '../main.service';

@Component({
  selector: 'app-personal-area',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  host: { ngSkipHydration: '' },

  templateUrl: './personal-area.component.html',
  styleUrl: './personal-area.component.css'
})
export class PersonalAreaComponent {
  events: IEvent[] = [];
  messages: IMessage[] = [];
  currentUserPhoneNumber!: string;
  constructor(private mainSvc: MainService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.getEvents();
    this.currentUserPhoneNumber = localStorage.getItem("phoneNumber") || ""
  }
  getEvents() {
    this.mainSvc.getEvents().subscribe((data: any) => {
      this.events = data.filter((event: IEvent) =>
        event.guestList && Array.isArray(event.guestList) && event.guestList.some((guest: IGuest) => guest.phoneNumber === this.currentUserPhoneNumber)
      );
      console.log(this.events);
    });
  }
  statuses = ["מאשר", "לא מאשר", "עדיין לא יודע"]
  updateGuestConfirmationStatus(eventId: string, eventForHtml: any) {
    const selectElement = eventForHtml as HTMLSelectElement;
    eventForHtml = selectElement?.value
    // Find the event and the guest in your data
    let event = this.events.find(e => e.id === eventId);

    let guest = event?.guestList.find(g => g.phoneNumber === this.currentUserPhoneNumber);
    if (guest) {
      // Update the confirmation status
      guest.confirmationStatus = eventForHtml;

      if (event)
        // Now, update the event on the server or wherever it's stored
        this.mainSvc.updateEvent(event.id, event).then(updatedEvent => {
        })
    }
  }

  openDialog(guest: IGuest, event: any): void {
    event.stopPropagation()
    this.mainSvc.currentUserOpen.next(guest)
    const dialogRef = this.dialog.open(ChatComponent, {
      width: '', backdropClass: 'custom-dialog-backdrop',

      data: { ...guest },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.mainSvc.currentUserOpen.next(null)
    });
  }
}