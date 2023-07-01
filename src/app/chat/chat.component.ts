import { Component } from '@angular/core';
import { io } from 'socket.io-client';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messageText: string = "";
  messages: string[] = []
  private socket: any;
  private serveURL = 'http://localhost:8000';

  constructor(private chatService: ChatService){

  }

  ngOnInit(){
    console.log('oi')
    this.chatService.connect();

    this.chatService.receiveMessages().subscribe(message => {
      this.messages.push(message)
      console.log(`Messagem: ${message}`)
      console.log('aqui')
    })
  }



  public sendMessage(message:string):void {
    this.chatService.sendMessage(message);
    this.messageText = ""
  }
}
