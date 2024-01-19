// phone-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PhoneAuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const phoneNumber = localStorage.getItem('phoneNumber');  // Adjust the key if necessary

    if (phoneNumber) {
      return true; // If phone number exists, allow access to the route      
    } else {
      this.router.navigate(['/login']);// If phone number doesn't exist, redirect to login
      return false;
    }
  }
}