import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  public errorMessage: string = '';
  private userRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  public userRole$: Observable<string | null> =
    this.userRoleSubject.asObservable();
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private firestore: AngularFirestore
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  SignIn(email: string, password: string) {
    this.errorMessage = '';
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['']);
          }
        });
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }
  // SignUp(email: string, password: string) {
  //   this.errorMessage = '';
  //   return this.afAuth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       const user = result.user;

  //       if (user) {
  //       /* Call the SendVerificaitonMail() function when new user sign
  //       up and returns promise */
  //       // this.SendVerificationMail();
  //       this.firestore.collection('users').doc(user.uid).set({
  //         uid: user.uid,
  //         email: user.email,
  //         role: 'user'
  //         // Add more user data as needed
  //       });
  //       this.SetUserData(result.user);
  //       this.afAuth.authState.subscribe((user) => {
  //         if (user) {
  //           this.router.navigate(['']);
  //         }
  //       });
  //     }})
  //     .catch((error) => {
  //       this.errorMessage = error.message;
  //     });
  // }
  SignUp(email: string, password: string) {
    this.errorMessage = '';
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;

        if (user) {
          this.firestore
            .collection('users')
            .doc(user.uid)
            .set({
              uid: user.uid,
              email: user.email,
              role: 'user',
              // Add more user data as needed
            })
            .then(() => {
              console.log('User added to the "users" collection:', user.uid);
              this.SetUserData(result.user);
              this.router.navigate(['']);
            })
            .catch((error) => {
              console.error('Error adding user to "users" collection:', error);
              this.errorMessage = error.message;
            });
        }
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        this.errorMessage = error.message;
      });
  }
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null /*&& user.emailVerified !== false*/ ? true : false; //rajja3ha mba3d ki taamel email verification
  }
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // getUserRole(): Observable<string | null> {
  //   return this.afAuth.authState.pipe(
  //     take(1),
  //     switchMap((user) => {
  //       if (user && user.uid) {
  //         return this.firestore
  //           .doc<any>(`users/${user.uid}`)
  //           .valueChanges()
  //           .pipe(
  //             take(1),
  //             map((userData) => {
  //               return userData?.role || null;
  //             })
  //           );
  //       } else {
  //         return new Observable<string | null>((observer) => {
  //           observer.next(null);
  //           observer.complete();
  //         });
  //       }
  //     })
  //   );
  // }
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
