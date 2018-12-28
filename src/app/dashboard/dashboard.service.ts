import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BancoHora } from '../shared/models/banco-hora.model';


@Injectable()
export class DashboardService {
  private db: any;

  constructor(private firestore: AngularFirestore) {
    this.db = this.firestore.collection('bancoHoras');
  }

  readBancoHora() {
    return this.db.snapshotChanges();
  }

  createBancoHora(bancoHora: BancoHora) {
    return this.db.add(bancoHora);
  }

  updateBancoHora(bancoHora: BancoHora) {
    return this.firestore.doc('bancoHoras/' + bancoHora.id).update(bancoHora);
  }

  deleteBancoHora(id: string) {
    return this.firestore.doc('bancoHoras/' + id).delete();
  }
}
