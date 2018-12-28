import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class DashboardService {

  constructor(private firestore: AngularFirestore) { }

  getBancoHoras() {
    return this.firestore.collection('bancoHoras').snapshotChanges();
  }



}
