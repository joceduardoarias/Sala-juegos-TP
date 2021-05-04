import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { QuiensoyComponent } from './components/quiensoy/quiensoy.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ChatfirestoreComponent } from './components/chatfirestore/chatfirestore.component';
import { ListadoRealtimeComponent } from './components/listado-realtime/listado-realtime.component';
import { TatetiComponent } from './juegos/tateti/tateti.component';
import { PiedraPapleOTijeraComponent } from './juegos/piedra-paple-o-tijera/piedra-paple-o-tijera.component';
import { SalaDeJuegosComponent } from './components/sala-de-juegos/sala-de-juegos.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AnagramaComponent } from './juegos/anagrama/anagrama.component';
import { MemotestComponent } from './juegos/memotest/memotest.component';
import { HttpClientModule } from "@angular/common/http";
import { HttpService } from "./services/http.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    QuiensoyComponent,
    RegistroComponent,
    NavBarComponent,
    ChatfirestoreComponent,
    ListadoRealtimeComponent,
    TatetiComponent,
    PiedraPapleOTijeraComponent,
    SalaDeJuegosComponent,
    AnagramaComponent,
    MemotestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
