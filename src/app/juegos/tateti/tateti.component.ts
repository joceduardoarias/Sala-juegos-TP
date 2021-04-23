import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit {
  
  comenzar:boolean = false;
  casilleros: any;

  constructor() {
    this.casilleros = new Array(9);
   }

  ngOnInit(): void {
  }
  
  jugar(numeroCasillero:number){
    
    if(!this.casilleros[numeroCasillero]){
      this.casilleros[numeroCasillero] = "x";
      var celdas = document.getElementsByClassName("celda");
      for (let index = 0; index < celdas.length; index++) {
        if(index == numeroCasillero){
          celdas[index].setAttribute("value",'X');
          break;
        }
        
      }
      
      if(this.gano("x")){
        console.log("GANASTE");
        this.reiniciar();
      }
      else if(this.gano("o")){
        console.log("PERDISTE PETE");
        this.reiniciar();
      }
      else if(this.empate()){
        console.log("EMPATASTE CONTRA LA MÁQUINA PETARDO");
        this.reiniciar();
      }
      else{
        setTimeout(() => this.juegaMaquina(), 500);
      }
    }
  }

  reiniciar(){
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
    this.casilleros[numCasillero] = "o";
    var celdas = document.getElementsByClassName("celda");
      for (let index = 0; index < celdas.length; index++) {
        if(index == numCasillero){
          celdas[index].setAttribute("value",'O');
          break;
        }
        
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

}
