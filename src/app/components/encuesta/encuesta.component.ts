import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Encuesta } from "../../modelos/encuesta";

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  // nombre: FormControl = new FormControl('',Validators.required);
  // apellido: FormControl = new FormControl('',Validators.required);
  // edad: FormControl = new FormControl('',[Validators.required,Validators.min(18),Validators.max(99)]);
  // email: FormControl = new FormControl('',[Validators.required,Validators.email]);
  // preguntaUno : FormControl =new FormControl('',Validators.required);
  // preguntaDos : FormControl =new FormControl('',Validators.required);
  // preguntaTres : FormControl =new FormControl('',Validators.required);
  // telefono : FormControl =new FormControl('',[Validators.required,Validators.maxLength(11)]);
  validaP3 :boolean = true;
  formEncuesta: FormGroup = new FormGroup({});

  constructor() { 
    this.formEncuesta = new FormGroup({
      
      nombre:  new FormControl('',Validators.required),
      apellido:  new FormControl('',Validators.required),
      edad:  new FormControl('',[Validators.required,Validators.min(18),Validators.max(99)]),
      email:  new FormControl('',[Validators.required,Validators.email]),
      preguntaUno : new FormControl('',Validators.required),
      preguntaDos : new FormControl('',Validators.required),
      preguntaTres : new FormControl('',Validators.required),
      telefono : new FormControl('',[Validators.required,Validators.maxLength(11)])

    })
  }

  ngOnInit(): void {
  }

  validaCheckBox(){
    this.formEncuesta.get('preguntaTres')!.valueChanges.subscribe((res:any)=>{
      this.validaP3 = res;
      console.log(res);
      
    })
    
  }

  validarFormulario(){
    if(this.formEncuesta.status == "VALID"){
      //guardar la encuesta!!!
      console.log(this.formEncuesta.status);
      
    }
  }
}
