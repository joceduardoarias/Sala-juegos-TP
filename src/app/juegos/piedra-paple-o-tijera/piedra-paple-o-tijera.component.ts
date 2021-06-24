import { Component, OnInit } from '@angular/core';
import { Puntajes } from "../../modelos/puntajes";
import Swal from 'sweetalert2';
import { AuthService } from "../../services/auth.service";
import { PiedraPapelTijeraService } from "../../services/piedra-papel-tijera.service";

@Component({
  selector: 'app-piedra-paple-o-tijera',
  templateUrl: './piedra-paple-o-tijera.component.html',
  styleUrls: ['./piedra-paple-o-tijera.component.css']
})
export class PiedraPapleOTijeraComponent implements OnInit {

  opciones = [0, 1, 2];
  eleccionMaquina!:number;
  backgroundUrl= "/assets/img.jpg";
  //Configuaración guardar partidas
  listaPuntajes = new Array();
  contadorVitorias:number = 0;
  contadorDerrotas:number = 0;
  contadorEmpates: number = 0;
  puntajes!:Puntajes;
  puntajesVista!:Puntajes;
  id: string = "";
  tieneDatosCargados: boolean = false;

  constructor(private piedraPtServicio : PiedraPapelTijeraService, private auth:AuthService) { 
    this.puntajes = new Puntajes();
    this.inicializarPuntajes();
    this.puntajes.email = localStorage.getItem("usuario");
    console.log(localStorage.getItem("usuario"));
    this.getAll();
  }

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
              // document.getElementById('efecto')!.innerHTML ='<h1>¡Perdiste!</h1> <h3>La maquina eligio papel y tu piedra.</h3>';
              Swal.fire({
                position: 'center',
                icon: 'info',
                title: '<h1>¡Perdiste!</h1> <h3>La maquina eligio papel y tu piedra.</h3>',
                showConfirmButton: false,
                timer: 1500
              });
              this.contadorDerrotas++;
              this.puntajes.derrotas = this.contadorDerrotas.toString();
          }else{
              if(this.opciones[this.eleccionMaquina] == 2){
                  // document.getElementById('efecto')!.innerHTML ='<h1>¡Ganaste!</h1> <h3>La maquina eligio tijera y tu piedra.</h3>';
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '<h1>¡Ganaste!</h1> <h3>La maquina eligio tijera y tu piedra.</h3>',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.contadorVitorias++;
                  this.puntajes.victorias = this.contadorVitorias.toString();
              }else{
                  if(this.opciones[this.eleccionMaquina] == 0){
                      // document.getElementById('efecto')!.innerHTML ='<h1>¡Empate!</h1> <h3>Ambos eligieron piedra.</h3>';
                      Swal.fire({
                        position: 'center',
                        icon: 'info',
                        title: '<h1>¡Empate!</h1> <h3>Ambos eligieron piedra.</h3>',
                        showConfirmButton: false,
                        timer: 1500
                      });
                      this.contadorEmpates++;
                      this.puntajes.empate = this.contadorEmpates.toString();
                  }
              }
          } 
      }

      if(eleccionUsuario == 1){//el usuario eligio papel 
          if(this.opciones[this.eleccionMaquina] == 2){
              // document.getElementById('efecto')!.innerHTML ='<h1>¡Perdiste!</h1> <h3>La maquina eligio tijera y tu papel.</h3>';
              Swal.fire({
                position: 'center',
                icon: 'info',
                title: '<h1>¡Perdiste!</h1> <h3>La maquina eligio tijera y tu papel.</h3>',
                showConfirmButton: false,
                timer: 1500
              });
              this.contadorDerrotas++;
              this.puntajes.derrotas = this.contadorDerrotas.toString();
          }else{
              if(this.opciones[this.eleccionMaquina] == 0){
                  // document.getElementById('efecto')!.innerHTML ='<h1>¡Ganaste!</h1> <h3>La maquina eligio piedra y tu papel.</h3>';
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '<h1>¡Ganaste!</h1> <h3>La maquina eligio piedra y tu papel.</h3>',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.contadorVitorias++;
                  this.puntajes.victorias = this.contadorVitorias.toString();
                  
              }else{
                  if(this.opciones[this.eleccionMaquina] == 1){
                      // document.getElementById('efecto')!.innerHTML ='<h1>¡Empate!</h1> <h3>Ambos eligieron papel.</h3>'; 
                      Swal.fire({
                        position: 'center',
                        icon: 'info',
                        title: '<h1>¡Empate!</h1> <h3>Ambos eligieron papel.</h3>',
                        showConfirmButton: false,
                        timer: 1500
                      });
                      this.contadorEmpates++;
                      this.puntajes.empate = this.contadorEmpates.toString();
                  }
              }
          }
      }

      if(eleccionUsuario == 2) {//el usuario eligio tijera 
          if(this.opciones[this.eleccionMaquina] == 1){
              // document.getElementById('efecto')!.innerHTML ='<h1>¡Ganaste!</h1> <h3>La maquina eligio papel y tu tijera.</h3>';
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '<h1>¡Ganaste!</h1> <h3>La maquina eligio papel y tu tijera.</h3>',
                showConfirmButton: false,
                timer: 1500
              });
              this.contadorVitorias++;
              this.puntajes.victorias = this.contadorVitorias.toString();  
          }else{
              if(this.opciones[this.eleccionMaquina] == 0){
                  // document.getElementById('efecto')!.innerHTML ='<h1>¡Perdiste!</h1> <h3>La maquina eligio piedra y tu tijera.</h3>'; 
                  Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: '<h1>¡Perdiste!</h1> <h3>La maquina eligio piedra y tu tijera.</h3>',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.contadorDerrotas++;
                  this.puntajes.derrotas = this.contadorDerrotas.toString();
              }else{
                  if(this.opciones[this.eleccionMaquina] == 2) {
                      document.getElementById('efecto')!.innerHTML ='<h1>¡Empate!</h1> <h3>Ambos eligieron tijera.</h3>';
                      Swal.fire({
                        position: 'center',
                        icon: 'info',
                        title: '<h1>¡Empate!</h1> <h3>Ambos eligieron tijera.</h3>',
                        showConfirmButton: false,
                        timer: 1500
                      });
                      this.contadorEmpates++;
                      this.puntajes.derrotas = this.contadorEmpates.toString();
                  }
              }
          }
      }

      // document.getElementById('efecto')!.style.display = "";
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
  getAll(){
    var lista = this.piedraPtServicio.piedraPtRef.valueChanges({ idField: 'propertyId' })
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
  inicializarPuntajes(){
    this.puntajes.derrotas = "0";
    this.puntajes.victorias = "0";
    this.puntajes.empate = "0";
  }
  guardar(){
    console.log(this.tieneDatosCargados);
    console.log(this.puntajes);
    
    if (this.puntajes) {
        if(!this.tieneDatosCargados){
        this.piedraPtServicio.create(this.puntajes);
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
        this.piedraPtServicio.update(this.id,this.puntajes);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tus partidas están guardadas',
          showConfirmButton: false,
          timer: 1500
        });
      }
      
      this.inicializarPuntajes();
    } else {
      Swal.fire({
        icon: 'info',
        title: 'JUGÁ...',
        text: 'PARA GUARDAR UNA PARTIDA DEBES JUGARLA ANTES!',
      });
    }
    
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
            icon: 'info',
            title: '...',
            text: 'NO TIENES PARTIDAS GUARDADAS!',
          });
    }    
  }
}
