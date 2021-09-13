import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Puntajes } from "../modelos/puntajes";

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  private dbPath = '/preguntados';
  preguntadosRef: AngularFirestoreCollection<Puntajes>;

  constructor(private db: AngularFirestore) { 
    this.preguntadosRef = db.collection(this.dbPath);
  }

  getAll(){
    return this.preguntadosRef;
 }

 create(puntajes: Puntajes): any {
   console.log(puntajes);
   
   return this.preguntadosRef.add({...puntajes});
 }

 update(id: string, data: any): Promise<void> {
   return this.preguntadosRef.doc(id).update({
     derrotas: data.derrotas,
     victorias: data.victorias,
     email: data.email,
     empate: data.empate
   });
 }

 delete(id: string): Promise<void> {
  return this.preguntadosRef.doc(id).delete();
}
}
