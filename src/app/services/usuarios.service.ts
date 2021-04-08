import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private dbPath = '/usuarios';
  usuariosRef : AngularFirestoreCollection<Usuario>
  
  constructor(private db: AngularFirestore) { 
    this.usuariosRef = db.collection(this.dbPath);
  }

  
  getAll(): AngularFirestoreCollection<Usuario>{
    return this.usuariosRef;
  }
  
 create(usuario:Usuario){
  return this.usuariosRef.add({...usuario});
 }
  
}
