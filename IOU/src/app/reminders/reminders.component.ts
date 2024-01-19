import { Component } from '@angular/core';
import { MainService } from '../main.service';
import { IReminder } from '../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reminders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.css'
})
export class RemindersComponent {
  constructor(private mainSvc: MainService) { }
  reminders: any[] = []
  ngOnInit() {
    this.mainSvc.getReminders().subscribe((data: any) => {
      this.reminders = data.filter((reminder: IReminder) => reminder.phoneNumber === localStorage.getItem("phoneNumber") || "")
    })
  }
}