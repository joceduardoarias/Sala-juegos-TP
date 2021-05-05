import { Component, OnInit, AfterViewInit, ViewChildren  } from '@angular/core';
import { Mensajes } from "./../../modelos/mensajes";
import { MensajesRealtimeService } from '../../services/mensajes-realtime.service';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { trigger,state,style,transition,animate,keyframes } from "@angular/animations";

@Component({
  selector: 'app-listado-realtime',
  templateUrl: './listado-realtime.component.html',
  styleUrls: ['./listado-realtime.component.css'],
  animations:[
    trigger("colapsar",[
      state('small',style({display : 'none'})),
      state('large', style({height : '100%'})),
      transition('small <=> large', animate('400ms ease-in'))
    ])
  ]
})
export class ListadoRealtimeComponent implements OnInit {

  listadoMensajes?: any[];
  mensajeActual?: Mensajes;
  currentIndex = -1;
  title = '';

  isLogged:boolean=false;
  usuarioLogeado : string | null = "";
  
  state : string = 'small';
  masMenos : string = "collapsible";
  constructor(private servicioRealTime:MensajesRealtimeService,private authService : AuthService) { 

  }

  ngOnInit(): void {
    this.cargarMensajes();
    this.getUsuarioActual();
  }

  cargarMensajes(): void {
    this.servicioRealTime.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log(data);
      this.listadoMensajes = data;
    });
  }

  getUsuarioActual(){
    
    // this.authService.isAuth().then((res:any)=>{
    //   this.usuarioLogeado=res.email;
    //   this.isLogged = true;
    // },error =>{
    //   this.isLogged = false;
    // });
    this.usuarioLogeado = localStorage.getItem('usuario');
    if (this.usuarioLogeado!= null) {
        this.isLogged = true;
    } else {
        this.isLogged = false;
    }
    
  }
  animacion(){
    this.state = (this.state === 'small'?'large':'small')
    this.masMenos = (this.masMenos === 'collapsible'?'active':'collapsible');
  }
}
