import { Injectable } from "@angular/core";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { DatabaseService } from "../Database/database.service";
import { AngularFireDatabase } from "@angular/fire/database";
@Injectable({
  providedIn: "root"
})
export class AuthenticatorService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private database: DatabaseService
  ) {
    this.afAuth.user.subscribe(usr => {
      var userInfo = {
        uid: usr.uid,
        email: usr.email,
        name: usr.displayName,
        photoURL: usr.photoURL
      };
      if (usr != null) {
        this.database.getUserData(userInfo);
      }
    });
  }

  userInfo: any;
  credential: any = null;

  // Sign in with Google
  async login() {
    const provider = new auth.GoogleAuthProvider();
    this.credential = await this.afAuth.auth.signInWithPopup(provider);
    this.afAuth.user.subscribe(usr => {
      this.userInfo = {
        uid: usr.uid,
        email: usr.email,
        name: usr.displayName,
        photoURL: usr.photoURL
      };
      this.database.getUserData(this.userInfo);
    });
  }

  // Sign out with Google
  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["login"]);
    });
  }

  // Auth logic to run auth providers
  // AuthLogin(provider) {
  //   return this.afAuth.auth.signInWithPopup(provider)
  //     .then((result) => {
  //       console.log('You have been successfully logged in!')
  //     }).catch((error) => {
  //       console.log(error)
  //     });
  // }
}
