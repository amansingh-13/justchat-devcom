import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';
import { User } from '../../user/user.model'
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  list_of_users: Observable<any[]>;
  relevant_messages: Observable<any[]>;
  selected_user: User;
  inter_user: Observable<User>;
  
  constructor(public authService:  AuthService, private afs: AngularFirestore) 
  {
    this.list_of_users = afs.collection('users').valueChanges();
  }
 
  ngOnInit(): void {
  }

  onSelect(selected_user_input: User): void {
    this.selected_user = selected_user_input;
  }

  send_message(sender_uid: string, receiver_uid: string, text_input: string){
      if(text_input!=""){
      var curr_datetime = new Date();
      const data = {
        members: [sender_uid, receiver_uid],
        text: text_input,
        datetime: curr_datetime
      }
      return this.afs.collection('messages').add(data);
    }
  }

  get_messages(first: string, second:string){
    this.relevant_messages = this.afs.collection('messages',
     ref => ref.where('members', 'in', [[first, second], [second, first]]).orderBy('datetime', 'asc') )
     .valueChanges();
    // a custom index has been created in firestore : datetime_members to serve this query
  }


  clear() {
    var resetForm = <HTMLInputElement>document.getElementById("myForm");
    resetForm.value = "";
  }
  
}
