import { Component, OnInit } from '@angular/core';
import { Palabras } from "./../../modelos/palabras";
@Component({
  selector: 'app-ahoracado',
  templateUrl: './ahoracado.component.html',
  styleUrls: ['./ahoracado.component.css']
})
export class AhoracadoComponent implements OnInit {

  objPalabras: Palabras = new Palabras();
  palabra : string = "";
  palabraOculta = '';
  intentos = 0;

  gano = false;
  perdio = false;


  letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
  'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  constructor(){    
    this.generarPalabra();
  }

  ngOnInit(): void {
  }

  generarPalabra(){
    var numero = Math.floor(Math.random() * this.objPalabras.palabrasJuego.length);
    console.log(numero);
    this.palabra = this.objPalabras.palabrasJuego[numero];
    this.palabraOculta = '_ '.repeat( this.palabra.length );
  }

  comprobar( letra:any){
    this.existeLetra( letra );
    const  palabraOcultaArr = this.palabraOculta.split(' ');
    console.log(palabraOcultaArr);
    for( let i = 0; i < this.palabra.length; i++ ){
       if( this.palabra[i] === letra ){
        palabraOcultaArr[i] = letra;
       }
    }
    this.palabraOculta = palabraOcultaArr.join(' ');
    this.verificaGane();
  }
  verificaGane(){
    const palabraArr = this.palabraOculta.split(' ');
    const palabraEvaluar = palabraArr.join('');

    if( palabraEvaluar === this.palabra ){
      this.gano =  true;
    }

    if( this.intentos >= 9 ){
      this.perdio = true;      
    }

  }

  existeLetra( letra:any ){
     if( this.palabra.indexOf( letra ) >= 0  ){
          console.log('Letra existe: ' + letra);
     } else {
      console.log('Letra no existe: ' + letra);
      this.intentos++;
     }
  }  

}
