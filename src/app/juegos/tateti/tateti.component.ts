import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TatetiService } from "../../services/tateti.service";
import { Puntajes } from "../../modelos/puntajes";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit {
  
  comenzar:boolean = false;
  casilleros = new Array(9);
  listaPuntajes = new Array();
  ficha :string = "";
  contadorVitorias:number = 0;
  contadorDerrotas:number = 0;
  contadorEmpates: number = 0;
  puntajes!:Puntajes;
  puntajesVista!:Puntajes;
  id: string = "";

  tieneDatosCargados: boolean = false;

  constructor(private tatetiServicio : TatetiService, private auth:AuthService) {    
    this.puntajes = new Puntajes();
    this.inicializarPuntajes();
    this.puntajes.email = localStorage.getItem("usuario");
    console.log(localStorage.getItem("usuario"));
    this.getAll();
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
        this.contadorVitorias++;
        this.puntajes.victorias = this.contadorVitorias.toString();
        console.log(this.puntajes);
        
        console.log("GANASTE");
        Swal.fire({
          icon: 'success',
          title: 'Ganaste...',
          text: 'Vamos por mas!',
        });
        this.reiniciar();
      }else if(this.empate()){
        console.log("EMPATASTE CONTRA LA MÁQUINA CRACK");
        this.contadorEmpates++;
        this.puntajes.empate = this.contadorEmpates.toString();
        Swal.fire({
          icon: 'success',
          title: 'EMPATASTE CONTRA LA MÁQUINA CRACK...',
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
        this.contadorDerrotas++;
        this.puntajes.derrotas = this.contadorDerrotas.toString();
        Swal.fire({
          icon: 'success',
          title: 'GANA LA MAQUINA...',
          text: 'soy imbencible!',
        });
        this.reiniciar();
      }else if(this.empate()){
        console.log("EMPATASTE CONTRA LA MÁQUINA CRACK");
        this.contadorEmpates++;
        this.puntajes.empate = this.contadorEmpates.toString();
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

  guardar(){
    console.log(this.tieneDatosCargados);
    
    if(!this.tieneDatosCargados){
      // this.tatetiServicio.create(this.puntajes);
      console.log("guardar");
      
    }else{
      
      this.puntajes.victorias = (+(+this.puntajes.victorias) +(+this.puntajesVista.victorias)).toString();
      this.puntajes.derrotas = (+(+this.puntajes.derrotas) +(+this.puntajesVista.derrotas)).toString();
      this.puntajes.empate = (+(+this.puntajes.empate) +(+this.puntajesVista.empate)).toString();
      this.tatetiServicio.update(this.id,this.puntajes);
    }
    
    this.inicializarPuntajes();
  }

  getAll(){
    var lista = this.tatetiServicio.tatetiRef.valueChanges({ idField: 'propertyId' })
     lista.subscribe(lista=>{
       console.log(lista);
       for (var puntaje of lista) {
         if (puntaje.email == this.puntajes.email) {
           this.puntajesVista = puntaje;
           this.tieneDatosCargados = true;
           this.id = puntaje.propertyId;
           break;
         }
       }
     });
  }
  inicializarPuntajes(){
    this.puntajes.derrotas = "0";
    this.puntajes.victorias = "0";
    this.puntajes.empate = "0";
  }
}
