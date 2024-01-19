import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainService } from '../main.service';
import { CommonModule } from '@angular/common';
import { IEvent, IGuest } from '../interfaces';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
declare let Swal: any;

@Component({
  selector: 'app-buy-ticket-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './buy-ticket-modal.component.html',
  styleUrl: './buy-ticket-modal.component.css'
})
export class BuyTicketModalComponent {
  @Input() data !: IEvent;
  updateEventForm!: FormGroup;
  ngOnInit() {
    this.mainSvc.currentEventOpen.subscribe((data) => {
      if (data) {
        this.data = data;
        this.initializeForm();
      }
    });
  }
  constructor(private fb: FormBuilder, private mainSvc: MainService, public dialogRef: MatDialogRef<BuyTicketModalComponent>) { }
  initializeForm() {
    this.updateEventForm = this.fb.group({

      guestName: ['', [Validators.required]] // Assuming guestName is a text input and is required
    });
  }
  submitUpdate() {
    if (this.updateEventForm.valid) {
      const updatedEventData = this.updateEventForm.value;
      this.updateEvent(updatedEventData);
    } else {
      console.error("Form is not valid");
    }
  }

  updateEvent(updatedEventData: any) {
    const guestName = this.updateEventForm.get('guestName')?.value;
    const phoneNumber = localStorage.getItem("phoneNumber") || "";

    // Create the new guest object
    const guest: IGuest = { name: guestName, phoneNumber: phoneNumber, confirmationStatus: '' };

    // Check if the guest with the same phoneNumber already exists in the guestList
    const exists = this.data.guestList.some(existingGuest => existingGuest.phoneNumber === guest.phoneNumber);

    if (!exists) {
      // If the guest doesn't exist, push it to the guestList
      this.data.guestList.push(guest);
    } else {
      // If the guest exists, you might want to handle it differently, maybe update the existing record or notify the user
      Swal.fire("אורח עם מספר טלפון זה כבר קיים!");

      this.mainSvc.updateEvent(this.data.id, this.data).then(updatedEvent => {
        // Handle the updated event
      });
    }

    this.dialogRef.close();
  }
}