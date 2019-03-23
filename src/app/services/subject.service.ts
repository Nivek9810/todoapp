import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SubjectI } from "../models/subject.interface";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private subjectCollection: AngularFirestoreCollection<SubjectI>;
  private subjects: Observable<SubjectI[]>;

  constructor(private db: AngularFirestore) { }

  getSubjects() {
    this.subjectCollection = this.db.collection<SubjectI>('materias');
    return this.subjects = this.subjectCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(act => {
          const data = act.payload.doc.data();
          const id = act.payload.doc.id;
          return { id, ...data };
        });
      }));
  }

  getSubject(id: string){
    return this.subjectCollection.doc<SubjectI>(id).valueChanges();
  }
}
