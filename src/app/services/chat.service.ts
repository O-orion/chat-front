import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: any;
  private serveURL = 'http://localhost:8000'
  constructor() { }

  public connect(): void {
    this.socket = io(this.serveURL);
  }

  public sendMessage(message: string): void {
    this.socket.emit('message', message)
  }

  public receiveMessages(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('chatMessage', (message: string) => {
        observer.next(message)
      })
    })
  }
}
