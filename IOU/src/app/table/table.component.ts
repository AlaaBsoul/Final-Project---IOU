import { Component, Input } from '@angular/core';
import { IEvent, IGuest, IReminder } from '../interfaces';
import { CommonModule } from '@angular/common';
import { MainService } from '../main.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateEventModalComponent } from '../update-event-modal/update-event-modal.component';
import { BuyTicketModalComponent } from '../buy-ticket-modal/buy-ticket-modal.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  host: { ngSkipHydration: '' },

  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() events: IEvent[] = []
  @Input() isMyEventsComponent = false;
  @Input() isPaymentEventsComponent = false;

  ngOnInit() {
    console.log(this.events)
  }
  constructor(private mainSvc: MainService, public dialog: MatDialog) { }

  //update my event
  openUpdateEventDialog(eventOfMe: IEvent, event: any): void {
    event.stopPropagation()
    console.log(eventOfMe)
    this.mainSvc.currentEventOpen.next(eventOfMe)
    const dialogRef = this.dialog.open(UpdateEventModalComponent, {
      width: '', backdropClass: 'custom-dialog-backdrop',

      data: { ...eventOfMe },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.mainSvc.currentEventOpen.next(null)
    });
  }
  //Send message
  sendReminder(guestList: IGuest[], eventName: string) {
    const now = new Date();
    // Get the day, month, and year from the current date
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    // Format the date and time as dd/mm/yyyy hh:mm
    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
    //Iterate through each guest and create a reminder
    guestList.forEach(guest => {
      let reminder: IReminder = {
        phoneNumber: guest.phoneNumber,
        eventName: eventName,
        time: formattedDateTime
      };
      //Add the newly created reminder to the array of reminders
      this.mainSvc.addReminder(reminder).then((res) => {
        console.log(res)
      })
    });
  }

  updateEvent(eventId: string) {
    let event = this.events.find(e => e.id === eventId);

    if (event)
      // Update the event on the server or wherever it's stored
      this.mainSvc.updateEvent(event.id, event).then(updatedEvent => {
      })
  }
  //Take the event and add guest and open modal for name
  buyTicket(eventOfMe: IEvent, event: any) {
    event.stopPropagation()
    this.mainSvc.currentEventOpen.next(eventOfMe)
    const dialogRef = this.dialog.open(BuyTicketModalComponent, {
      width: '', backdropClass: 'custom-dialog-backdrop',

      data: { ...eventOfMe },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.mainSvc.currentEventOpen.next(null)
    });
  }
}