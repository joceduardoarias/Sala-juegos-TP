import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { UsuariosService } from "../../services/usuarios.service";
import { FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  password = new FormControl('');
  email = new FormControl('');
  nombre = new FormControl('');
  usuario : Usuario = {"email":"","nombre":""};
  
  constructor(private auth: AuthService,
              private usuarioService: UsuariosService,
              private router: Router) { }

  ngOnInit(): void {
  }

  registrar(){
    
    this.usuario.email = this.email.value;
    this.usuario.nombre = this.nombre.value;

    this.auth.registrar(this.email.value,this.password.value)
    .then(res=>{
      console.log(res);
      //Guardo en la db
      this.usuarioService.create(this.usuario);
      //informo al usuario del exito
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuario registrado con existo',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/home']);      
    }, error =>{
      console.log(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email o Contraseña incorrecta!',
        footer: '<a></a>'
      });
    });
  }
}
