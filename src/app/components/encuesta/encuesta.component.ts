import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Encuesta } from "../../modelos/encuesta";
import { EncuestaService } from "../../services/encuesta.service";
import { AuthService } from "../../services/auth.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  validaP3 :boolean = true;
  formEncuesta: FormGroup = new FormGroup({});
  nuevaEncuesta!: Encuesta;

  constructor(private encuestaService: EncuestaService, private auth:AuthService) { 
    this.nuevaEncuesta = new Encuesta();
    this.nuevaEncuesta.email = localStorage.getItem("usuario");
    console.log(localStorage.getItem("usuario"));
    // this.getAll();
  }

  ngOnInit(): void {
    this.formEncuesta = new FormGroup({
      
      nombre:  new FormControl('',Validators.required),
      apellido:  new FormControl('',Validators.required),
      edad:  new FormControl('',[Validators.required,Validators.min(18),Validators.max(99)]),
      email:  new FormControl('',[Validators.required,Validators.email]),
      preguntaUno : new FormControl('',Validators.required),
      preguntaDos : new FormControl('',Validators.required),
      preguntaTres : new FormControl('',Validators.required),
      telefono : new FormControl('',[Validators.required,Validators.maxLength(11)])

    });
  }

  validaCheckBox(){
    this.formEncuesta.get('preguntaTres')!.valueChanges.subscribe((res:any)=>{
      this.validaP3 = res;
      console.log(res);
      
    })
    
  }

  guardar(){
    if(this.formEncuesta.status == "VALID"){
      if(this.validaP3){
        this.nuevaEncuesta.nombre = this.formEncuesta.get('nombre')?.value;      
        this.nuevaEncuesta.apellido = this.formEncuesta.get('apellido')?.value;
        this.nuevaEncuesta.email = this.formEncuesta.get('email')?.value;
        this.nuevaEncuesta.edad = this.formEncuesta.get('edad')?.value;
        this.nuevaEncuesta.telefono = this.formEncuesta.get('telefono')?.value;
        this.nuevaEncuesta.preguntaUno = this.formEncuesta.get('preguntaUno')?.value;
        this.nuevaEncuesta.preguntaDos = this.formEncuesta.get('preguntaDos')?.value;
        this.nuevaEncuesta.preguntaTres = this.formEncuesta.get('preguntaTres')?.value;
        //guardar en la colleción
        this.encuestaService.create(this.nuevaEncuesta);
        this.formEncuesta.reset();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Gracias por contestar nuestra encuesta',
          showConfirmButton: false,
          timer: 1500
        });
      }else{
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Debe aceptar los terminos y condiciones',
          showConfirmButton: false,
          timer: 1500
        });
      }
      
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Todos los campos son requeridos',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
