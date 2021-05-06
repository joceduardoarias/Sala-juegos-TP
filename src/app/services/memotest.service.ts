import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Puntajes } from "../modelos/puntajes";

@Injectable({
  providedIn: 'root'
})
export class MemotestService {

  private dbPath = '/memotest';
  memotestRef: AngularFirestoreCollection<Puntajes>;
  lista = new Array();

  constructor(private db: AngularFirestore) { 
    this.memotestRef = db.collection(this.dbPath);
  }

  getAll(){
    return this.memotestRef;
 }
 create(puntajes: Puntajes): any {
  return this.memotestRef.add({...puntajes});
}

update(id: string, data: any): Promise<void> {
  return this.memotestRef.doc(id).update({
    derrotas: data.derrotas,
    victorias: data.victorias,
    email: data.email,
    empate: data.empate
  });
}

delete(id: string): Promise<void> {
  return this.memotestRef.doc(id).delete();
}
}
