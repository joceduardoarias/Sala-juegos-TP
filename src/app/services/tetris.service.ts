import { Injectable } from '@angular/core';
import { IPiece } from "./../modelos/piece";
import { COLS, ROWS, POINTS } from "./../modelos/const";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Puntajes } from "../modelos/puntajes";

@Injectable({
  providedIn: 'root'
})
export class TetrisService {

  private dbPath = '/tetris';
  tetrisRef: AngularFirestoreCollection<Puntajes>;

  constructor(private db: AngularFirestore) { 
    this.tetrisRef = db.collection(this.dbPath);
  }

  getAll(){
    return this.tetrisRef;
 }

 create(puntajes: Puntajes): any {
   console.log(puntajes);
   
   return this.tetrisRef.add({...puntajes});
 }

 update(id: string, data: any): Promise<void> {
   return this.tetrisRef.doc(id).update({
     derrotas: data.derrotas,
     victorias: data.victorias,
     email: data.email,
     empate: data.empate
   });
 }

  valid(p: IPiece, board: number[][]): boolean {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return (
          this.isEmpty(value) ||
          (this.insideWalls(x) &&
            this.aboveFloor(y) &&
            this.notOccupied(board, x, y))
        );
      });
    });
  }

  isEmpty(value: number): boolean {
    return value === 0;
  }

  insideWalls(x: number): boolean {
    return x >= 0 && x < COLS;
  }

  aboveFloor(y: number): boolean {
    return y <= ROWS;
  }

  notOccupied(board: number[][], x: number, y: number): boolean {
    return board[y] && board[y][x] === 0;
  }

  rotate(piece: IPiece): IPiece {
    let p: IPiece = JSON.parse(JSON.stringify(piece));
    for (let y = 0; y < p.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
      }
    }
    p.shape.forEach(row => row.reverse());
    return p;
  }

  getLinesClearedPoints(lines: number, level: number): number {
    const lineClearPoints =
      lines === 1
        ? POINTS.SINGLE
        : lines === 2
        ? POINTS.DOUBLE
        : lines === 3
        ? POINTS.TRIPLE
        : lines === 4
        ? POINTS.TETRIS
        : 0;

    return (level + 1) * lineClearPoints;
  }
  
}
