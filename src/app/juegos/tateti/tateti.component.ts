import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit {
  
  comenzar:boolean = false;
  casilleros = new Array(9);
  ficha :string = "";

  constructor() {
   }

  ngOnInit(): void {
  }
  
  jugar(numeroCasillero:number){
    
    if(!this.casilleros[numeroCasillero]){
      this.casilleros[numeroCasillero] = this.ficha;
      var celdas = document.getElementsByClassName("celda");
      for (let index = 0; index < celdas.length; index++) {
        if(index == numeroCasillero){
          celdas[index].setAttribute("value",this.ficha.toUpperCase());
          break;
        }
        
      }
      
      if(this.gano(this.ficha)){
        console.log("GANASTE");
        Swal.fire({
          icon: 'success',
          title: 'Ganaste...',
          text: 'Vamos por mas!',
        });
        this.reiniciar();
      }else if(this.empate()){
        console.log("EMPATASTE CONTRA LA MÁQUINA PETARDO");
        Swal.fire({
          icon: 'success',
          title: 'EMPATASTE CONTRA LA MÁQUINA MOSTRO...',
          text: 'Estas mejorando!',
        });
        this.reiniciar();
      }
      else{
        setTimeout(() => this.juegaMaquina(), 500);
      }
    }
  }

  reiniciar(){
    var celdas = document.getElementsByClassName("celda");
      for (let index = 0; index < celdas.length; index++) {
        
          celdas[index].setAttribute("value",'');
          
        }
    this.casilleros = new Array(9);
    
  }
  
  empate():boolean{
    let retorno = true;
    for (let index = 0; index < this.casilleros.length; index++) {
      if(!this.casilleros[index]){
        retorno = false;
        break;
      }
    }
    return retorno;
  }
  
  juegaMaquina(){
    console.log("JUEGA MAQUINA");
    
    let disponible = false;
    let numCasillero:number = 0;
    while(!disponible){
      numCasillero = Math.floor(Math.random() * 9 + 0);
      if(!this.casilleros[numCasillero]){
        disponible = true;
      }
    }
    var fichaMaquina = this.ficha == "x" ? "o":"x";
    this.casilleros[numCasillero] = fichaMaquina;
    var celdas = document.getElementsByClassName("celda");
      for (let index = 0; index < celdas.length; index++) {
        if(index == numCasillero){
          celdas[index].setAttribute("value",fichaMaquina.toUpperCase());
          break;
        }
        
      }

      if(this.gano(fichaMaquina)){
        console.log("GANA LA MAQUINA");
        Swal.fire({
          icon: 'success',
          title: 'GANA LA MAQUINA...',
          text: 'soy imbencible!',
        });
        this.reiniciar();
      }else if(this.empate()){
        console.log("EMPATASTE CONTRA LA MÁQUINA PETARDO");
        Swal.fire({
          icon: 'success',
          title: 'EMPATASTE CONTRA LA MÁQUINA MOSTRO...',
          text: 'Estas mejorando!',
        });
        this.reiniciar();
      }
  } 

  gano(letra:string):boolean {
    
    if(this.casilleros[0] == letra && this.casilleros[1] == letra && this.casilleros[2] == letra) {
      return true;
    }
    if(this.casilleros[3] == letra && this.casilleros[4] == letra && this.casilleros[5] == letra) {
      return true;
    }
    if(this.casilleros[6] == letra && this.casilleros[7] == letra && this.casilleros[8] == letra) {
      return true;
    }

    if(this.casilleros[0] == letra && this.casilleros[3] == letra && this.casilleros[6] == letra) {
      return true;
    }
    if(this.casilleros[1] == letra && this.casilleros[4] == letra && this.casilleros[7] == letra) {
      return true;
    }
    if(this.casilleros[2] == letra && this.casilleros[5] == letra && this.casilleros[8] == letra) {
      return true;
    }

    if(this.casilleros[0] == letra && this.casilleros[4] == letra && this.casilleros[8] == letra) {
      return true;
    }
    if(this.casilleros[2] == letra && this.casilleros[4] == letra && this.casilleros[6] == letra) {
      return true;
    }
    return false;
  }

  eligeFicha(ficha:string){
    this.ficha = ficha;
  }
}
