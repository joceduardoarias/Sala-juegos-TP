import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuestaComponent } from '../components/encuesta/encuesta.component';
import { QuiensoyComponent } from '../components/quiensoy/quiensoy.component';

const routes: Routes = [
  {path: 'quiensoy', component: QuiensoyComponent}, 
  {path: 'encuesta', component: EncuestaComponent},
  {path:'',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutesRoutingModule { }
