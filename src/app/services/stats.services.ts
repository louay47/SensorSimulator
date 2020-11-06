import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Stats } from './../models/stats.model';
import { stat } from 'fs';


@Injectable()
export class StatService {

  
    constructor(
        private httpClient: HttpClient
    ) {}

  

    sendStat(stat: Stats): Observable<Stats> {

        const url = 'http://localhost:8080/stats';

        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-type': 'application/json'
        });

        const body = JSON.stringify(stat);

        return this.httpClient.post<Stats>(url, body, { headers: headers });

    }

    getAppNumber (id_exercice_aff : number) {

            const url = `http://localhost:8080/stats/appNumber/`;

            const headers = new HttpHeaders({
                'Accept': 'application/json',
            });
           
            return this.httpClient.get<number>(url+id_exercice_aff, { headers: headers }); 
          
    }


    generateStat(previousStat: Stats ,app_number : number ): Stats {
       
        let stat: Stats = new Stats();
       
        stat.app_number = app_number ; 
        stat.affected_exercice = {id_exercice_aff: 7};
        stat.stability = this.getRandomIntegr(70, 90);
        stat.qualite_pression = true;
        stat.temps = new Date();
        if (!previousStat || JSON.stringify(previousStat) === '{}') {
           
            stat.distance = 0;
            stat.nbr_appui_droit = 0;
            stat.nbr_appui_gauche = 0;
            stat.nbr_pas = 0;
            stat.vitesse = 0;
            stat.rythme = 0;
            stat.pression_arterielle = 0;
            stat.quantite_pression = 0;
         
        } else {
            stat.distance = previousStat.distance + 2;
            stat.nbr_appui_droit = previousStat.nbr_appui_droit + 1;
            stat.nbr_appui_gauche = previousStat.nbr_appui_gauche + 1;
            stat.nbr_pas = previousStat.nbr_pas + 2;
            let x = ((previousStat.vitesse - 10) < 0) ? 0 : previousStat.vitesse - 10;
            stat.vitesse = this.getRandomIntegr(x, previousStat.vitesse + 20);
            stat.rythme = previousStat.vitesse / 2;
            stat.pression_arterielle = this.getRandomIntegr(40, 100);
            stat.quantite_pression = this.getRandomIntegr(50, 100);
 
        }

        return stat;

    }

    private getRandomIntegr(min: number, max: number): number {

        return Math.floor(Math.random() * (max - min + 1)) + min;

    }

}
