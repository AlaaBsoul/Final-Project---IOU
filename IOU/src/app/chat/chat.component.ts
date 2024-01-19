import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MainService } from '../main.service';
import { IGuest, IMessage } from '../interfaces';

@Component({
  selector: 'app-chat',
  standalone: true,
  host: { ngSkipHydration: '' },
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],

  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  currentNumber!: string;
  constructor(private mainSvc: MainService, private datePipe: DatePipe) { }

  message: string = ''
  currentUserOpen!: IGuest | null;
  sendMessage() {
    if (this.message.length == 0) {
      return
    }
    const time = new Date();

    const event: any = { content: this.message, time: time, receiverNumber: this.currentUserOpen?.phoneNumber, senderNumber: localStorage.getItem("phoneNumber") }
    this.mainSvc.addMessage(event).then((res) => {
      console.log(res)
    })
    this.message = "";
  }
  ngOnInit(): void {
    this.currentNumber = localStorage.getItem("phoneNumber") || ""
    this.getMessages();
    this.mainSvc.currentUserOpen.subscribe((user) => {
      this.currentUserOpen = user
    })

  }

  formatTimestamp(firestoreTimestamp: any) {
    return this.datePipe.transform(new Date(firestoreTimestamp.seconds * 1000), 'dd/MM/yyyy HH:mm:ss');
  }

  getMessages() {
    this.mainSvc.getMessages().subscribe((res: any[]) => {
      this.messages = res.filter((message) =>
        (message.senderNumber === this.currentUserOpen?.phoneNumber && message.receiverNumber === localStorage.getItem("phoneNumber")) ||
        (message.receiverNumber === this.currentUserOpen?.phoneNumber && message.senderNumber === localStorage.getItem("phoneNumber"))
      );
      // Sort messages by timestamp in ascending order
      this.messages.sort((a: any, b: any) => a.time?.seconds - b.time?.seconds);

      console.log(this.messages);
    })
  }
  @Input() messages: IMessage[] = [

  ];

}
