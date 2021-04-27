import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {
  
  palabraRandom: number = 0;
  palabraUser: string = "";
  palabraDesordenada: string = "";
  gano!:boolean;
  enJuego: boolean = false;
  ocultarVerificar:boolean = false;
  Mensajes!: string;
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
  constructor() { }

  ngOnInit(): void {
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
        document.getElementById("mensajeID")!.textContent = this.Mensajes;
        // $('#mensajeID').text(this.Mensajes);
        document.getElementById("mensajeID")!.style.backgroundColor= "green";
        // $('#mensajeID').css("background-color", "green");
      }else{
        document.getElementById("mensajeID")!.textContent = this.Mensajes;
        document.getElementById("mensajeID")!.style.backgroundColor= "red";
        // $('#mensajeID').text(this.Mensajes);
        // $('#mensajeID').css("background-color", "red");
      }
    var modelo=this;
    setTimeout(function(){ 
           modelo.ocultarVerificar=true;
     }, 3000); 
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

}
