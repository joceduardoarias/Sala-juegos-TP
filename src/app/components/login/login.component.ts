import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FormControl } from "@angular/forms";
import Swal from 'sweetalert2';
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  password = new FormControl('');
  email = new FormControl('');

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }
  
  ingresar(){
    this.auth.singIn(this.email.value,this.password.value)
    .then (res=>{
      console.log(res);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Bienvenido a la Sala de juegos',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/home']);
      localStorage.setItem("usuario",this.email.value);
    }, error => {
      console.log(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email o Contraseña incorrecta!',
        footer: '<a></a>'
      })
    });
  }
}
