import { Routes } from '@angular/router';
import { UnpaymentEventsPageComponent } from './unpayment-events-page/unpayment-events-page.component';
import { PaymentEventsPageComponent } from './payment-events-page/payment-events-page.component';
import { AddEventPageComponent } from './add-event-page/add-event-page.component';
import { PersonalAreaComponent } from './personal-area/personal-area.component';
import { LoginComponent } from './login/login.component';
import { PhoneAuthGuard } from './auth/phone-auth.guard';
import { MyCreatedEventsComponent } from './my-created-events/my-created-events.component';
import { RemindersComponent } from './reminders/reminders.component';
export const routes: Routes = [
  {
    path: 'unpayment-events', component: UnpaymentEventsPageComponent, canActivate: [PhoneAuthGuard],
  },
  { path: 'payment-events', component: PaymentEventsPageComponent, canActivate: [PhoneAuthGuard] },
  { path: 'add-event', component: AddEventPageComponent, canActivate: [PhoneAuthGuard] },
  { path: 'personal-area', component: PersonalAreaComponent, canActivate: [PhoneAuthGuard] }
  , { path: 'login', component: LoginComponent },
  { path: 'my-created-events', component: MyCreatedEventsComponent, canActivate: [PhoneAuthGuard] },
  { path: 'my-reminders', component: RemindersComponent, canActivate: [PhoneAuthGuard] },
];