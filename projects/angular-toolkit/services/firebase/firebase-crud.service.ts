import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';

@Injectable()
export abstract class FirebaseService<T> {
  constructor(private _firestore: AngularFirestore, private _entity: string) {}


  public create(uid: string, data: T): Observable<void> {
    return from(this._firestore.doc<T>(`${this._entity}/${uid}`).set(data));
  }

  public get(uid: string): Observable<T | undefined > {
    return this._firestore.doc<T>(`${this._entity}/${uid}`).valueChanges();
  }

  public update(uid: string, data: T): Observable<void> {
    return from(this._firestore.doc<T>(`${this._entity}/${uid}`).update(data));
  }

  public  delete(uid: string): Observable<void> {
    return from(this._firestore.doc<T>(`${this._entity}/${uid}`).delete());
  }
}