import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ChatService } from '../../Services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FooterComponent, FormsModule, CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  // message!: string;
  // messageArr: any[] = [];
  // constructor(private socket: ChatService) {
  //   socket.connect();
  // }

  // sendMessage() {
  //   this.messageArr.push(this.message);
  // }

  message!: string;
  messages: any[] = [];

  constructor(private http: HttpClient) {
    this.fetchMessages();
    this.sendMessage();
  }

  sendMessage() {
    const senderId = 'yourSenderId'; // Replace with actual sender ID
    const receiverId = 'yourReceiverId'; // Replace with actual receiver ID
    const body = {
      senderId,
      receiverId,
      message: this.message,
    };

    this.http.post('http://localhost:3000/chats/conversations', body).subscribe(
      (response) => {
        console.log('Message sent successfully:', response);
        // Optionally, you can update the UI or clear the message input field
        this.message = '';
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
  }

  fetchMessages() {
    const chatId = '538391b3-aca0-42fa-af16-bdde1407a28a'
    this.http
      .get(`http://localhost:3000/chats/chat-messages/${chatId}`)
      .subscribe(
        (response: any) => {
          this.messages = response.messages;
          console.log(this.messages);
          
        },
        (error) => {
          console.error('Error fetching messages:', error);
        }
      );
  }

  
}
