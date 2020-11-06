export class Stats {

    id: number;
    stability: number;
    nbr_pas: number;
    nbr_appui_gauche: number;
    nbr_appui_droit: number;
    vitesse: number;
    rythme: number;
    distance: number;
    qualite_pression: boolean;
    quantite_pression: number;
    pression_arterielle: number;
    temps: Date;
    app_number : number;
    affected_exercice: {
        id_exercice_aff: number ;
    }

}
