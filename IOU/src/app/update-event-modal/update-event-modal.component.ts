import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainService } from '../main.service';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-event-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './update-event-modal.component.html',
  styleUrl: './update-event-modal.component.css'
})
export class UpdateEventModalComponent {
  @Input() data: any;
  updateEventForm!: FormGroup;
  ngOnInit() {
    this.mainSvc.currentEventOpen.subscribe((data) => {
      if (data) {
        this.data = data;
        this.initializeForm(data);
      }
    });
  }
  
  constructor(private fb: FormBuilder, private mainSvc: MainService, public dialogRef: MatDialogRef<UpdateEventModalComponent>) { }
  initializeForm(data: any) {
    this.updateEventForm = this.fb.group({
      eventName: [data.eventName, [Validators.required]],
      eventDate: [data.eventDate, Validators.required],
      eventLocation: [data.eventLocation, Validators.required],
      eventType: [data.eventType, Validators.required],
      eventCost: [data.eventCost, [Validators.required]],
      personalReminders: [data.personalReminders],
      digitalInvitations: [data.digitalInvitations]
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

    if (this.data)
      // Now, update the event on the server or wherever it's stored
      this.mainSvc.updateEvent(this.data.id, updatedEventData).then(updatedEvent => {
      })
    this.dialogRef.close()

  }
}