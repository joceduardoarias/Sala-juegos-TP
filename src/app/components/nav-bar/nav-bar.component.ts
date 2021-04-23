import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  
  isLogged:boolean=false;
  
  usuarioLogeado : string | null = "";
  
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.getUsuarioActual();
  }
  
  getUsuarioActual(){
    
    this.authService.isAuth().then((res:any)=>{
      this.usuarioLogeado=res.email;
      this.isLogged = true;
    },error =>{
      this.isLogged = false;
    });
    
  }
  
  logOut(){
    this.authService.signOut();
  }
}
