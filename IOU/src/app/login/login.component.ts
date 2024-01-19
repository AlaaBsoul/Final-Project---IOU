import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  host: { ngSkipHydration: '' },

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  phoneNumber = '';

  constructor(private router: Router, private mainSvc: MainService) { }

  isValid = true;
  navigateIfValid() {
    const israeliPhoneRegex = /^05\d{8}$/;
    const digitsOnlyPhoneNumber = this.phoneNumber.replace(/\D/g, '');

    if (israeliPhoneRegex.test(digitsOnlyPhoneNumber)) {
      localStorage.setItem("phoneNumber", this.phoneNumber);
      this.isValid = true;  // Set isValid to true if the number is valid
      this.mainSvc.isUserLoggedSubject.next(this.isValid);
      this.router.navigate(['personal-area']);
    } else {
      this.isValid = false;  // Set isValid to false to show error message
    }
  }
}