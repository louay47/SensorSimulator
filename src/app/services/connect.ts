import { Injectable } from "@angular/core";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { $ } from "protractor";
import { AppComponent } from '../app.component';
import { Stats } from '../models/stats.model';



@Injectable()
export class Connect {

    private serverUrl = 'http://localhost:8080/gs-guide-websocket'
    private stompClient;

    constructor(){
        // this.initializeWebSocketConnection();
      }
     
      initializeWebSocketConnection(){
        let ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        let that = this;
        this.stompClient.connect({}, function(frame) {
            console.log(frame);
            console.log(that.stompClient);
        //  that.stompClient.subscribe("/topic", (message) => {
            });
        };
      
       

        sendMessage(message: Stats) {
            this.stompClient.send("/app/stats" , {}, JSON.stringify(message));
        //  $('#input').val('');
        }

        disconnect(){
           this.stompClient.disconnect();
        }

        sendAppNumber(message : Stats){
            this.stompClient.send("/app/result", {}, JSON.stringify(message));
        }
}