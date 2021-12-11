import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components/components.module';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {MensajesService} from "./services/mensajes.service";

//Storage local
import { IonicStorageModule } from '@ionic/storage-angular';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,ComponentsModule,IonicStorageModule.forRoot(),HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },MensajesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
