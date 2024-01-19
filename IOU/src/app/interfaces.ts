export interface IGuest {
  name: string;
  phoneNumber: string;
  confirmationStatus: string;
}

export interface IEvent {
  id: string;
  eventName: string;
  eventDate: Date;
  eventLocation: string;
  eventType: string;
  guestList: IGuest[];
  eventCost: number;
  personalReminders: string;
  digitalInvitations: boolean;
  phoneNumberOfCreator?: string;
}

export interface IEventsArray {
  events: Event[];
}

export interface IMessage {
  senderNumber: string;
  receiverNumber: string;
  content: string;
  time: string;
}
export interface IReminder {
  phoneNumber: string;
  eventName: string;
  time: string;
}