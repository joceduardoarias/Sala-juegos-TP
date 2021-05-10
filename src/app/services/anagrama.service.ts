import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Puntajes } from "../modelos/puntajes";

@Injectable({
  providedIn: 'root'
})
export class AnagramaService {

  private dbPath = '/anagrama';
  anagramaRef: AngularFirestoreCollection<Puntajes>;
  
  constructor(private db: AngularFirestore) { 
    this.anagramaRef = db.collection(this.dbPath);
  }

  getAll(){
    return this.anagramaRef;
 }

 create(puntajes: Puntajes): any {
   return this.anagramaRef.add({...puntajes});
 }

 update(id: string, data: any): Promise<void> {
   return this.anagramaRef.doc(id).update({
     derrotas: data.derrotas,
     victorias: data.victorias,
     email: data.email,
     empate: data.empate
   });
 }

 delete(id: string): Promise<void> {
   return this.anagramaRef.doc(id).delete();
 }
}
