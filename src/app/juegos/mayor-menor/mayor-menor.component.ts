import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from "../../services/auth.service";
import { Puntajes } from "../../modelos/puntajes";
import { MayorMenorService } from "../../services/mayor-menor.service";
@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {
  
  palos = ["corazon", "diamante", "pica", "trebol"];
  valores = [{
                valor:"2",
                numero:2
              }, 
              {
                valor:"3",
                numero:3
              }, 
              {
                valor:"4",
                numero:4
              },
              {
                valor:"5",
                numero:5
              }, 
              {
                valor:"6",
                numero:6
              },
              {
                valor:"7",
                numero:7
              },
              {
                valor:"8",
                numero:8
              },
              {
                valor:"9",
                numero:9
              },
              {
                valor:"10",
                numero:10
              },
              {
                valor:"J",
                numero:11
              }, 
              {
                valor:"Q",
                numero:12
              }, 
              {
                valor:"K",
                numero:13
              }, 
              {
                valor:"A",
                numero:14
              }
              ];
  logueado:boolean = false;            
  paloArriba :any;
  numero : any;
  paloAbajo : any;
  cartaActual : any;
  cartaAnterior : any;

  //Puntajes
  contadorVitorias:number = 0;
  contadorDerrotas:number = 0;
  contadorEmpates: number = 0;
  puntajes!:Puntajes;
  puntajesVista!:Puntajes;
  listaPuntajes = new Array();
  tieneDatosCargados: boolean = false;
  id: string = "";

  constructor(private mayorMenorService : MayorMenorService, private auth:AuthService) {
    this.puntajes = new Puntajes();
    this.inicializarPuntajes();
    this.puntajes.email = localStorage.getItem("usuario");
    console.log(localStorage.getItem("usuario"));
    this.getAll();
   }

  ngOnInit(): void {
    this.paloArriba = document.getElementById("simboloArriba");
    this.numero = document.getElementById("numero");
    this.paloAbajo = document.getElementById("simboloAbajo");
    this.generacionCarta("inicio");
    if (localStorage.getItem("user") != null) {
      this.logueado = true;
    }
  }

    eleccionCarta(arr1:any, arr2:any){
      let carta =[]
      carta.push(arr1[Math.floor(Math.random()*arr1.length)]);
      carta.push(arr2[Math.floor(Math.random()*arr2.length)]);
      return carta
  }
    asignarColor(arr:any){
      if(arr[0] === "corazon" || arr[0] === "diamante"){
          this.paloArriba.style.color = "red";
          this.numero.style.color = "red";
          this.paloAbajo.style.color = "red";
      }
      else{
          this.paloArriba.style.color = "black";
          this.numero.style.color = "black";
          this.paloAbajo.style.color = "black";
      }
  }
    asignarPalo(arr:any){
      if(arr[0] === "corazon"){
          this.paloArriba.innerHTML = "♥"
          this.paloAbajo.innerHTML = "♥"
      }
      else if(arr[0] === "diamante"){
          this.paloArriba.innerHTML = "♦"
          this.paloAbajo.innerHTML = "♦"
      }
      else if(arr[0] === "trebol"){
          this.paloArriba.innerHTML = "♣"
          this.paloAbajo.innerHTML = "♣"
      }
      else{
          this.paloArriba.innerHTML = "♠"
          this.paloAbajo.innerHTML = "♠"
      }
  }
    asignarValor(arr:any){
      this.numero.innerHTML = arr[1].valor;
  }
    generacionCarta(accion:string){
      if (accion == "inicio") {
        this.cartaActual = this.eleccionCarta(this.palos, this.valores);
        this.asignarColor(this.cartaActual);
        this.asignarPalo(this.cartaActual);
        this.asignarValor(this.cartaActual);         
      }       
      if(accion == "mayor" || accion == "menor") {
        this.cartaAnterior = this.cartaActual;
        this.generacionCarta("inicio");
      }
  }
    mayor(){
      this.generacionCarta("mayor");
      
      //Juagar
      if (this.cartaActual[1].numero == this.cartaAnterior[1].numero) {
        console.log("empate");
        this.contadorEmpates++;
        this.puntajes.empate = this.contadorEmpates.toString();
      }

      if (this.cartaActual[1].numero > this.cartaAnterior[1].numero) {
        console.log("ganaste");
        this.contadorVitorias++;
        this.puntajes.victorias = this.contadorVitorias.toString();
      } else {

        if (this.cartaActual[1].numero < this.cartaAnterior[1].numero) {
          console.log("perdiste");
          this.contadorDerrotas++; 
          this.puntajes.derrotas = this.contadorDerrotas.toString();
        }        
        
      }
    }

    menor(){
      this.generacionCarta("menor");
      
      //Juagar
      if (this.cartaActual[1].numero == this.cartaAnterior[1].numero) {
        console.log("empate");
        this.contadorEmpates++;
        this.puntajes.empate = this.contadorEmpates.toString();
      }

      if (this.cartaActual[1].numero < this.cartaAnterior[1].numero) {
        console.log("ganaste");
        this.contadorVitorias++;
        this.puntajes.victorias = this.contadorVitorias.toString();
      } else {

        if (this.cartaActual[1].numero > this.cartaAnterior[1].numero) {
          console.log("perdiste"); 
          this.contadorDerrotas++;
          this.puntajes.derrotas = this.contadorDerrotas.toString();
        }        
        
      }
    }

    inicializarPuntajes(){
      this.puntajes.derrotas = "0";
      this.puntajes.victorias = "0";
      this.puntajes.empate = "0";
      //Inicializa contadores
      this.contadorDerrotas = 0;
      this.contadorEmpates = 0;
      this.contadorVitorias = 0;
    }

    guardar(){
      console.log('bug');
      
      if(!this.tieneDatosCargados){
        this.mayorMenorService.create(this.puntajes);
        console.log("guardar");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tus partidas están guardadas',
          showConfirmButton: false,
          timer: 1500
        });
      }else{
        
        this.puntajes.victorias = (+(+this.puntajes.victorias) +(+this.puntajesVista.victorias)).toString();
        this.puntajes.derrotas = (+(+this.puntajes.derrotas) +(+this.puntajesVista.derrotas)).toString();
        this.puntajes.empate = (+(+this.puntajes.empate) +(+this.puntajesVista.empate)).toString();
        this.mayorMenorService.update(this.id,this.puntajes);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tus partidas están guardadas',
          showConfirmButton: false,
          timer: 1500
        });
      }
      
      this.inicializarPuntajes();
    }

    getAll(){
      var lista = this.mayorMenorService.mayorMenorRef.valueChanges({ idField: 'propertyId' })
       lista.subscribe(lista=>{
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

    mostrar(){
      
      if (this.puntajesVista) {
        Swal.fire({
          title: '<strong>Partidas</strong>',
          icon: 'info',
          html:
          '<table class="table"><thead><tr><th scope="col">Jugador</th><th scope="col">Victorias</th><th scope="col">Derrotas</th><th scope="col">Empates</th></tr></thead><tbody><tr><th scope="row">'+this.puntajes.email+'</th><td>'+this.puntajesVista.victorias+'</td><td>'+this.puntajesVista.derrotas+'</td><td>'+this.puntajesVista.empate+'</td></tr>',
        });
      }else{
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'No tienes partidas guardadas',
          showConfirmButton: false,
        });
      }
        
      
    }
}
