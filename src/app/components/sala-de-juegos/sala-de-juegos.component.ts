import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-sala-de-juegos',
  templateUrl: './sala-de-juegos.component.html',
  styleUrls: ['./sala-de-juegos.component.css']
})
export class SalaDeJuegosComponent implements OnInit {

  logueado:boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem("user") != null) {
      this.logueado = true;
    }
  }

}
