import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable()
export class FirebaseFileService {
  public progress?: Observable<number | undefined >;
  constructor(private storage: AngularFireStorage) {
  }

  public get(path: string): Observable<any> {
    return this.storage.ref(path).getDownloadURL();
  }

  public delete(path: string): Observable<any> {
    return this.storage.ref(path).delete();
  }

  public upload(file: File, path: string): Observable<any> {
    const filePath = path + file.name;
    const task = this.storage.upload(filePath, file);
    const fileRef = this.storage.ref(filePath);
    this.progress = task.percentageChanges();
    return task.snapshotChanges().pipe(
        concatMap(() => fileRef.getDownloadURL())
    );
  }


}