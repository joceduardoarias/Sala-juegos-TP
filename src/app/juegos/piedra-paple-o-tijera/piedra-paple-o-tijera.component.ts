import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piedra-paple-o-tijera',
  templateUrl: './piedra-paple-o-tijera.component.html',
  styleUrls: ['./piedra-paple-o-tijera.component.css']
})
export class PiedraPapleOTijeraComponent implements OnInit {

  opciones = [0, 1, 2];
  eleccionMaquina!:number;
  backgroundUrl= "/assets/img.jpg";

  constructor() { }

  ngOnInit(): void {
  }

  aleatorio(minimo:number, maximo:number){
      var numero = Math.floor(Math.random() * (maximo - minimo +1) + minimo);
      return numero;
  }

  iniciaPartida(opcion:string){
     var eleccionUsuario = parseInt(opcion);
     this.eleccionMaquina =this.aleatorio(0,2);

      if(eleccionUsuario == 0){//el usuario eligio piedra 
          if(this.opciones[this.eleccionMaquina] == 1){//si la maquina eligio papel 
              document.getElementById('efecto')!.innerHTML ='<h1>¡Perdiste!</h1> <h3>La maquina eligio papel y tu piedra.</h3>';
          }else{
              if(this.opciones[this.eleccionMaquina] == 2){
                  document.getElementById('efecto')!.innerHTML ='<h1>¡Ganaste!</h1> <h3>La maquina eligio tijera y tu piedra.</h3>';
              }else{
                  if(this.opciones[this.eleccionMaquina] == 0){
                      document.getElementById('efecto')!.innerHTML ='<h1>¡Empate!</h1> <h3>Ambos eligieron piedra.</h3>';
                  }
              }
          } 
      }

      if(eleccionUsuario == 1){//el usuario eligio papel 
          if(this.opciones[this.eleccionMaquina] == 2){
              document.getElementById('efecto')!.innerHTML ='<h1>¡Perdiste!</h1> <h3>La maquina eligio tijera y tu papel.</h3>';
          }else{
              if(this.opciones[this.eleccionMaquina] == 0){
                  document.getElementById('efecto')!.innerHTML ='<h1>¡Ganaste!</h1> <h3>La maquina eligio piedra y tu papel.</h3>';
                  
              }else{
                  if(this.opciones[this.eleccionMaquina] == 1){
                      document.getElementById('efecto')!.innerHTML ='<h1>¡Empate!</h1> <h3>Ambos eligieron papel.</h3>'; 
                  }
              }
          }
      }

      if(eleccionUsuario == 2) {//el usuario eligio tijera 
          if(this.opciones[this.eleccionMaquina] == 1){
              document.getElementById('efecto')!.innerHTML ='<h1>¡Ganaste!</h1> <h3>La maquina eligio papel y tu tijera.</h3>';
          
          }else{
              if(this.opciones[this.eleccionMaquina] == 0){
                  document.getElementById('efecto')!.innerHTML ='<h1>¡Perdiste!</h1> <h3>La maquina eligio piedra y tu tijera.</h3>'; 
              }else{
                  if(this.opciones[this.eleccionMaquina] == 2) {
                      document.getElementById('efecto')!.innerHTML ='<h1>¡Empate!</h1> <h3>Ambos eligieron tijera.</h3>';
                  }
              }
          }
      }

      document.getElementById('efecto')!.style.display = "";
  }

  quitarEfecto() {
      document.getElementById('efecto')!.style.display = "none";
 }

  opcionSeleccionada(opcion:string){

  this.iniciaPartida(opcion);
  
  }

  quitarEfectoPantalla(){
  this.quitarEfecto();
}
}
