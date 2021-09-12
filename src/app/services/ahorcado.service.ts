import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Puntajes } from "../modelos/puntajes";

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {

  private dbPath = '/ahorcado';
  ahorcadoRef: AngularFirestoreCollection<Puntajes>;

  constructor(private db: AngularFirestore) { 
    this.ahorcadoRef = db.collection(this.dbPath);
  }

  getAll(){
    return this.ahorcadoRef;
 }

 create(puntajes: Puntajes): any {
   console.log(puntajes);
   
   return this.ahorcadoRef.add({...puntajes});
 }

 update(id: string, data: any): Promise<void> {
   return this.ahorcadoRef.doc(id).update({
     derrotas: data.derrotas,
     victorias: data.victorias,
     email: data.email,
     empate: data.empate
   });
 }

 delete(id: string): Promise<void> {
  return this.ahorcadoRef.doc(id).delete();
}

}
