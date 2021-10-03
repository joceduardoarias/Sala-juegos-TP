import { Component, OnInit } from '@angular/core';
import { Puntajes } from "../../modelos/puntajes";
import Swal from 'sweetalert2';
import { AuthService } from "../../services/auth.service";
import { AnagramaService } from "../../services/anagrama.service";

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']  
})
export class AnagramaComponent implements OnInit {
  
  logueado:boolean = false;
  palabraRandom: number = 0;
  palabraUser: string = "";
  palabraDesordenada: string = "";
  gano!:boolean;
  enJuego: boolean = false;
  ocultarVerificar:boolean = false;
  Mensajes!: string;
  //configuración partidas
  contadorVictorias:number = 0;
  contadorDerrotas:number = 0;
  contadorEmpates: number = 0;
  puntajes!:Puntajes;
  puntajesVista!:Puntajes;
  id: string = "";
  tieneDatosCargados: boolean = false;

  diccionario: {[id: number]: string;} = {
    1:"ARGENTINA", 
    2:"ANAGRAMA", 
    3:"CELULAR", 
    4:"PERRO",
    5: "ANGULAR", 
    6: "FIREBASE", 
    7: "MONITOR", 
    8: "PATO",
    9: "ESCRITORIO",
    10: "LUZ",
    11: "LAMPARA",
    12: "AUTO",
    13: "ESPEJO",
    14: "CPU",
    15: "RELOJ",
    16: "MANO",
    17: "PELOTA",
    18: "CASTILLO",
    19: "EDIFICIO",
    20: "CALLE",
    21: "BARRIO",
    22: "NOMBRE",
    23: "PELO",
    24: "NARIZ",
    25: "ABEJA",
    26: "ANTEOJOS"
};
  

  constructor(private anagramaServicio : AnagramaService, private auth:AuthService) {
    this.puntajes = new Puntajes();
    this.inicializarPuntajes();
    this.puntajes.email = localStorage.getItem("usuario");
    console.log(localStorage.getItem("usuario"));
    this.getAll();
   }

  ngOnInit(): void {
    if (localStorage.getItem("user") != null) {
      this.logueado = true;
    }
  }
  


  verificar(): boolean 
    {
        if(this.diccionario[this.palabraRandom] == this.palabraUser.toUpperCase())
        {
            this.gano = true;
        }

        return this.gano;
    }
  NuevoJuego()
  {
    this.refresh();
    this.ocultarVerificar = true;
    this.enJuego = true;
    this.desordenar();
  }
  
  Verificar()
  {
    this.ocultarVerificar = false;

    if(this.verificar())
    {
      this.MostarMensaje("Ganaste genio!!!", true);
    }
    else
    {
      this.MostarMensaje("Perdiste", false);
    }

    this.enJuego = false
  }

  MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false) {
    this.Mensajes=mensaje;
    if(ganador)
      {
        this.contadorVictorias++;
        this.puntajes.victorias = this.contadorVictorias.toString();
        Swal.fire({
          icon: 'success',
          title: 'GANASTE...',
          text: 'VAMOS POR MAS!',
        });
      }else{
        this.contadorDerrotas++;
        this.puntajes.derrotas = this.contadorDerrotas.toString();
        Swal.fire({
          icon: 'error',
          title: 'PERDISTE...',
          text: 'LA PRACTICA HACE AL MAESTRO!',
        });
      }
      
    // var modelo=this;
    // setTimeout(function(){ 
    //        modelo.ocultarVerificar=true;
    //  }, 3000); 
   }
   
   desordenar()
   {
       this.palabraRandom = Math.floor(Math.random() * 26) + 1;
      console.log(this.palabraRandom);
      
       this.palabraDesordenada = this.diccionario[this.palabraRandom];

       let array: Array<string> = this.palabraDesordenada.split("");

       array.sort(function() 
       {
           let retorno = Math.floor((Math.random() * 3)) - 1;

           while(retorno == 0)
           {
               retorno = Math.floor((Math.random() * 3)) - 1;
           }

           return retorno;
       });

       this.palabraDesordenada = array.join("");
   }
   refresh()
   {
    this.palabraRandom = 0;
    this.palabraUser = "";
    this.palabraDesordenada = "";
    this.gano = false;
   }

   guardar(){
    console.log(this.tieneDatosCargados);
    console.log(this.puntajes);
    
    if (this.puntajes) {
        if(!this.tieneDatosCargados){
        this.anagramaServicio.create(this.puntajes);
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
        this.anagramaServicio.update(this.id,this.puntajes);
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

  getAll(){
    var lista = this.anagramaServicio.anagramaRef.valueChanges({ idField: 'propertyId' })
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
  mostrar(){
    console.log(this.puntajesVista);
    
      Swal.fire({
        title: '<strong>Partidas</strong>',
        icon: 'info',
        html:
        '<table class="table"><thead><tr><th scope="col">Jugador</th><th scope="col">Victorias</th><th scope="col">Derrotas</th><th scope="col">Empates</th></tr></thead><tbody><tr><th scope="row">'+this.puntajes.email+'</th><td>'+this.puntajesVista.victorias+'</td><td>'+this.puntajesVista.derrotas+'</td><td>'+this.puntajesVista.empate+'</td></tr>',
      });
    
  }

}
