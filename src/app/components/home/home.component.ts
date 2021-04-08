import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  estaLogueado:boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.estaLogueado = false;
  }

  procesarUsuarioLogueado(respuesta:boolean){
    console.log(respuesta);
    this.estaLogueado = respuesta;
  }
}
