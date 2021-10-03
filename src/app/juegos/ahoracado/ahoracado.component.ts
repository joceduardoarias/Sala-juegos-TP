import { Component, OnInit } from '@angular/core';
import { Puntajes } from 'src/app/modelos/puntajes';
import { Palabras } from "./../../modelos/palabras";
import Swal from 'sweetalert2';
import { AuthService } from "../../services/auth.service";
import { AhorcadoService } from "./../../services/ahorcado.service";
@Component({
  selector: 'app-ahoracado',
  templateUrl: './ahoracado.component.html',
  styleUrls: ['./ahoracado.component.css']
})
export class AhoracadoComponent implements OnInit {

  logueado:boolean = false;
  //Puntajes
  contadorVitorias:number = 0;
  contadorDerrotas:number = 0;
  contadorEmpates: number = 0;
  puntajes!:Puntajes;
  puntajesVista!:Puntajes;
  listaPuntajes = new Array();
  tieneDatosCargados: boolean = false;
  id: string = "";

  objPalabras: Palabras = new Palabras();
  palabra : string = "";
  palabraOculta = '';
  intentos = 0;



  letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
  'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  constructor(private ahorcadoService : AhorcadoService, private auth:AuthService){    
    this.puntajes = new Puntajes();
    this.inicializarPuntajes();
    this.puntajes.email = localStorage.getItem("usuario");
    console.log(localStorage.getItem("usuario"));
    this.getAll();
    this.generarPalabra();
  }
  
  ngOnInit(): void {
    if (localStorage.getItem("user") != null) {
      this.logueado = true;
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

  getAll(){
    var lista = this.ahorcadoService.ahorcadoRef.valueChanges({ idField: 'propertyId' })
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

  guardar(){
    
    if(!this.tieneDatosCargados){
      this.ahorcadoService.create(this.puntajes);
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
      this.ahorcadoService.update(this.id,this.puntajes);
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

  generarPalabra(){
    var numero = Math.floor(Math.random() * this.objPalabras.palabrasJuego.length);
    this.palabra = this.objPalabras.palabrasJuego[numero];
    this.palabra = this.palabra.toUpperCase();
    this.palabraOculta = '_ '.repeat( this.palabra.length );
    console.log(this.palabra);
    
  }

  comprobar( letra:any){
    this.existeLetra( letra );
    const  palabraOcultaArr = this.palabraOculta.split(' ');
    console.log(palabraOcultaArr);
    for( let i = 0; i < this.palabra.length; i++ ){
       if( this.palabra[i] === letra ){
        palabraOcultaArr[i] = letra;
       }
    }
    this.palabraOculta = palabraOcultaArr.join(' ');
    this.verificaGane();
  }
  verificaGane(){
    const palabraArr = this.palabraOculta.split(' ');
    const palabraEvaluar = palabraArr.join('');

    if( palabraEvaluar === this.palabra){
      this.contadorVitorias++;
      this.puntajes.victorias = this.contadorVitorias.toString();
      this.generarPalabra();
      Swal.fire({
        icon: 'success',
        title: 'Bien...',
        text: 'Ganaste!',
      });
      //actualizar imágen del ahorcado
      this.intentos = 0; 
    }

    if( this.intentos >= 9 ){
      this.contadorDerrotas++; 
      this.puntajes.derrotas = this.contadorDerrotas.toString();
      this.generarPalabra();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Perdiste!',
      });
      //actualizar imágen del ahorcado
      this.intentos = 0; 
      
    }

  }

  existeLetra( letra:any ){
     if( this.palabra.indexOf( letra ) >= 0  ){
          console.log('Letra existe: ' + letra);
     } else {
      console.log('Letra no existe: ' + letra);
      this.intentos++;
     }
  }  

}
