import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from "@angular/fire/firestore";
import { IEvent, IGuest, IMessage, IReminder } from './interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  isUserLoggedSubject = new BehaviorSubject<boolean>(false);
  currentUserOpen = new BehaviorSubject<IGuest | null>({} as IGuest);
  currentEventOpen = new BehaviorSubject<IEvent | null>({} as IEvent);

  constructor(private fs: Firestore) { }

  getReminders() {
    const messagesCollection = collection(this.fs, 'reminders');
    return collectionData(messagesCollection, { idField: 'id' });
  }

  addReminder(message: IReminder) {
    const data = { ...message };
    const messagesCollection = collection(this.fs, 'reminders');
    return addDoc(messagesCollection, data);
  }


  getMessages() {
    const messagesCollection = collection(this.fs, 'messages');
    return collectionData(messagesCollection, { idField: 'id' });
  }

  addMessage(message: IMessage) {
    const data = { ...message };
    const messagesCollection = collection(this.fs, 'messages');
    return addDoc(messagesCollection, data);
  }

  editEvent(eventId: string, eventData: Partial<IEvent>) {
    const eventDocRef = doc(this.fs, `iou/${eventId}`);
    return updateDoc(eventDocRef, eventData);
  }

  getEvents() {

    let eventCollection = collection(this.fs, 'iou');

    return collectionData(eventCollection, { idField: 'id' })
  }

  updateEvent(eventId: string, updatedEvent: IEvent) {
    // Reference to the specific document in the 'iou' collection
    const eventDocRef = doc(this.fs, 'iou', eventId);
    // The updated data is the new event data you pass to the function
    return updateDoc(eventDocRef, { ...updatedEvent });
  }
  
  addEvent(event: IEvent) {
    let data = { ...event };
    let nodesCollections = collection(this.fs, 'iou');
    return addDoc(nodesCollections, data)
  }

  deleteEvent(id: string) {
    let docRef = doc(this.fs, "iou" + "/" + id)
    return deleteDoc(docRef)
  }
}