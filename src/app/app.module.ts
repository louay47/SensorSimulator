import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';

import { StatService } from './services/stats.services';

import { Connect } from './services/connect';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        HttpClientModule
    ],
    providers: [
        StatService,
        Connect
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
