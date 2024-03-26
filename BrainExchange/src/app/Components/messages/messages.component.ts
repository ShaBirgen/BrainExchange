import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ChatService } from '../../Services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FooterComponent, FormsModule, CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  message!: string;
  messageArr: any[] = [];
  constructor(private socket: ChatService) {
    socket.connect()
  }

  sendMessage() {
    this.messageArr.push(this.message);
  }
}
