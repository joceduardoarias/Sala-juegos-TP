import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MayorMenorComponent } from '../juegos/mayor-menor/mayor-menor.component';
import { SalaDeJuegosComponent } from '../components/sala-de-juegos/sala-de-juegos.component';
import { AnagramaComponent } from '../juegos/anagrama/anagrama.component';
import { MemotestComponent } from '../juegos/memotest/memotest.component';
import { PiedraPapleOTijeraComponent } from '../juegos/piedra-paple-o-tijera/piedra-paple-o-tijera.component';
import { TatetiComponent } from '../juegos/tateti/tateti.component';
import { AhoracadoComponent } from '../juegos/ahoracado/ahoracado.component';
import { PreguntadosComponent } from '../juegos/preguntados/preguntados.component';
import { TetrisComponent } from '../juegos/tetris/tetris.component';

const routes: Routes = [
  // { path: '', component: JuegosRoutesComponent }
  {path: 'tateti', component: TatetiComponent},
  {path: 'piedraPapelTijera', component: PiedraPapleOTijeraComponent},
  {path: 'anagrama',component:AnagramaComponent},
  {path: 'sala', component: SalaDeJuegosComponent},
  {path: "memotest",component: MemotestComponent},
  {path: "mayorMenor",component: MayorMenorComponent},
  {path:"ahorcado",component:AhoracadoComponent},
  {path: "preguntados",component:PreguntadosComponent},
  {path: "tetris", component:TetrisComponent},
  {path:'',redirectTo:'sala',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutesRoutingModule { }
