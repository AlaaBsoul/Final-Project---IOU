import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private mainSvc: MainService) { }
  isUserLoggedSubject = false
  disconnect() {
    localStorage.setItem("phoneNumber", "")
    this.mainSvc.isUserLoggedSubject.next(false)
  }

}