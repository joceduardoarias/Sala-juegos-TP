import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Encuesta } from "../modelos/encuesta";

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  private dbPath = '/encuesta';

  encuestaiRef: AngularFirestoreCollection<Encuesta>;
  lista = new Array();
  
  constructor(private db: AngularFirestore) { 
    this.encuestaiRef = db.collection(this.dbPath);
  }

  getAll(){
    return this.encuestaiRef;
 }

 create(encuesta: Encuesta): any {
   return this.encuestaiRef.add({...encuesta});
 }

 update(id: string, data: any): Promise<void> {
   return this.encuestaiRef.doc(id).update({
     nombre:data.nombre,
     apellido: data.apellido,
     edad: data.edad,
     telefono: data.telefono,
     preguntaUno: data.preguntaUno,
     preguntaDos: data.preguntaDos,
     preguntaTres: data.preguntaTres,
     email: data.email
   });
 }

 delete(id: string): Promise<void> {
   return this.encuestaiRef.doc(id).delete();
 }
}
