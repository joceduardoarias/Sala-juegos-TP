import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { QuiensoyComponent } from './components/quiensoy/quiensoy.component';

const routes: Routes = [
  
  {path: 'home', component: HomeComponent},
  {path: 'quiensoy', component: QuiensoyComponent},  
  { path: 'ingreso', loadChildren: () => import('./ingreso/ingreso.module').then(m => m.IngresoModule) },
  { path: 'juegos', loadChildren: () => import('./juegos-routes/juegos-routes.module').then(m => m.JuegosRoutesModule) },
  {path: '', redirectTo:'home',pathMatch:'full'},
  {path: '**', component: ErrorComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
