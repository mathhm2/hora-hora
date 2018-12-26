import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { switchMap } from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firebaseStore: AngularFirestore,
    private router: Router
  ) {

    this.user = this.firebaseAuth.authState
      .pipe(switchMap(user => {
        if (user) {
          return this.firebaseStore.doc<User>(`user/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }));
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.firebaseAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
        this.router.navigate(['/dashboard']);
      })
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.firebaseStore.doc(`user/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
    };

    return userRef.set(data, { merge: true });
  }

  signOut() {
    this.firebaseAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/']);
      });
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }

}
