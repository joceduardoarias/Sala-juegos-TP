import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Puntajes } from "../modelos/puntajes";

@Injectable({
  providedIn: 'root'
})
export class MayorMenorService {

  private dbPath = '/mayorMenor';

  mayorMenorRef: AngularFirestoreCollection<Puntajes>;
  lista = new Array();
  
  constructor(private db: AngularFirestore) { 
    this.mayorMenorRef = db.collection(this.dbPath);
  }  

  getAll(){
     return this.mayorMenorRef;
  }

  create(puntajes: Puntajes): any {
    return this.mayorMenorRef.add({...puntajes});
  }

  update(id: string, data: any): Promise<void> {
    return this.mayorMenorRef.doc(id).update({
      derrotas: data.derrotas,
      victorias: data.victorias,
      email: data.email,
      empate: data.empate
    });
  }

  delete(id: string): Promise<void> {
    return this.mayorMenorRef.doc(id).delete();
  }
}
