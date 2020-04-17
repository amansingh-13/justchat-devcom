import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";

import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { User } from './user.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
    ) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } 
          else {
            return of(null);
          }
        })
      )
    }
  
  async loginwithemail(email: string, password: string){
    return await this.afAuth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.router.navigate(['home']);
   }).catch((error) => {
     window.alert(error.message)
   })
  }

  async signout(){
    await this.afAuth.signOut();
    return this.router.navigate(['login']);
  } 

  async signupwithemail(email: string, password: string, confirm_password:string, name: string){
    if(password===confirm_password && name!=""){
      try{
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password)
      //what if createUser is not successfull => alert error message later
      
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${credential.user.uid}`);
      const data = {
        uid: credential.user.uid,
        email: credential.user.email,
        name: name
      }
      userRef.set(data, { merge: true });
      return this.loginwithemail(email, password);
    }catch(error){
      window.alert(error.message)
    }
      
    }
    else{
      if(name==""){
        window.alert("Enter name")
      }
      window.alert("Passwords don't match")
    }
  }
}
