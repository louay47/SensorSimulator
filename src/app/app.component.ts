import { Component, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/takeWhile';

import { StatService } from './services/stats.services';

import { Stats } from './models/stats.model';

import * as Stomp from 'stompjs';

import * as SockJS from 'sockjs-client';
import { Connect } from './services/connect';
import { Subscriber } from 'rxjs/Subscriber';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

    delay = 0;
    start = false;
    responses: Stats[] = [];
    stats: Stats = new Stats();

    X : number ;

    constructor(
        private statService: StatService ,
        private connect : Connect
    ) {}

    

    onStart() {

        this.responses = [];
        this.stats = new Stats();
        
        this.statService.getAppNumber(7).subscribe(
            (response) => {
          
             

                    if (this.delay && this.delay >= 3000) {
                        this.start = true;
                       
                       

                        this.connect.initializeWebSocketConnection();
            
                        IntervalObservable.create(this.delay).takeWhile(() => this.start).subscribe(
                            () => {
                                
                                this.stats = this.statService.generateStat(this.stats , response +1);
                                
                                this.connect.sendMessage(this.stats);
                            }
                        );
            
                    }
            },
            (error) => {
                
                console.log(error);
            }
            
       );


      
        

        

    }

    onStop() {
        this.start = false;
        
       // this.statService.getAppNumber(7).subscribe(
        //    (Response) => {
                //this.connect.initializeWebSocketConnection();
              //  this.stats.app_number = Response;
                this.connect.sendAppNumber(this.stats);
          //  }
      //  )

        this.connect.disconnect();

    }

    ngOnDestroy() {

      //  this.start = false;

        this.connect.disconnect();

    }
    private getRandomIntegr(min: number, max: number): number {

        return Math.floor(Math.random() * (max - min + 1)) + min;

    }

    

}
