import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Puntajes } from "../modelos/puntajes";

@Injectable({
  providedIn: 'root'
})
export class PiedraPapelTijeraService {

  private dbPath = '/piedraPapelTijera';

  piedraPtRef: AngularFirestoreCollection<Puntajes>;
  lista = new Array();

  constructor(private db: AngularFirestore) { 
    this.piedraPtRef = db.collection(this.dbPath);
  }

  getAll(){
    return this.piedraPtRef;
 }

 create(puntajes: Puntajes): any {
   return this.piedraPtRef.add({...puntajes});
 }

 update(id: string, data: any): Promise<void> {
   return this.piedraPtRef.doc(id).update({
     derrotas: data.derrotas,
     victorias: data.victorias,
     email: data.email,
     empate: data.empate
   });
 }

 delete(id: string): Promise<void> {
   return this.piedraPtRef.doc(id).delete();
 }

}
