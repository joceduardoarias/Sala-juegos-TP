import { Component, OnInit } from '@angular/core';
import { MensajesFirestoreService } from '../../services/mensajes-firestore.service';
import { Mensajes } from "../../modelos/mensajes";
import { MensajesRealtimeService } from '../../services/mensajes-realtime.service';
import { FormsModule, FormControl } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chatfirestore',
  templateUrl: './chatfirestore.component.html',
  styleUrls: ['./chatfirestore.component.css']
})
export class ChatfirestoreComponent implements OnInit {
  
  limpiarInput : string = "";
  inputMensaje = new FormControl();
  nuevoMensaje: Mensajes = {mensaje:"",
                            timestamp:"",
                            nombre:""}; 
  logeado : boolean= false;

  constructor(private servicioFirestore:MensajesFirestoreService,
      private servicioRealTime:MensajesRealtimeService,
      private authService : AuthService,
  ) {
      this.nuevoMensaje = new Mensajes();
  }

  ngOnInit(): void {
    this.getUsuarioActual();
  }

  EnviarMensaje() {
    this.nuevoMensaje.timestamp = new Date().toDateString();

    this.servicioFirestore.create(this.nuevoMensaje).then(()=>{
      console.log("se envio el mensaje Fire");
    });

    this.servicioRealTime.create(this.nuevoMensaje).then(()=>{
      console.log("se envio el mensaje RealTime");
    });
    
    this.inputMensaje.reset();
  }

  getUsuarioActual(){
    
    this.authService.isAuth().then((res:any)=>{
      this.nuevoMensaje.nombre=res.email;
      console.log(this.nuevoMensaje.nombre=res.email);
      this.logeado = true;
    },error =>{
      console.log("no hay nadie logueado!!!");
      this.logeado = false;
    });
    
  }

}
