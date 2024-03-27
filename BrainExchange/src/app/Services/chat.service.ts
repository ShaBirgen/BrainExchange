import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { Observable } from 'rxjs';
const config: SocketIoConfig = {
  url: 'http://localhost:5050',
  options: {
    autoConnect: false,
  },
};

@Injectable({
  providedIn: 'root',
})
export class ChatService extends Socket {
  constructor(private http: HttpClient) {
    super(config);
  }

  createConversation(
    senderId: string,
    receiverId: string,
    message: string
  ): Observable<any> {
    return this.http.post<any>('YOUR_BACKEND_URL/createConversation', {
      senderId,
      receiverId,
      message,
    });
  }
}
