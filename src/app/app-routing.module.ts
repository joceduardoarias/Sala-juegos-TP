import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { QuiensoyComponent } from './components/quiensoy/quiensoy.component';
import { RegistroComponent } from './components/registro/registro.component';
import { SalaDeJuegosComponent } from './components/sala-de-juegos/sala-de-juegos.component';
import { AnagramaComponent } from './juegos/anagrama/anagrama.component';
import { PiedraPapleOTijeraComponent } from './juegos/piedra-paple-o-tijera/piedra-paple-o-tijera.component';
import { TatetiComponent } from './juegos/tateti/tateti.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'quiensoy', component: QuiensoyComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'tateti', component: TatetiComponent},
  {path: 'piedraPapelTijera', component: PiedraPapleOTijeraComponent},
  {path:'anagrama',component:AnagramaComponent},
  {path: 'juegos', component: SalaDeJuegosComponent},
  {path: '**', component: ErrorComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
