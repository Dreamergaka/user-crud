import { Component } from '@angular/core';
import { addDoc } from 'firebase/firestore';
import { usersCol } from '../firebase';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page {
  newUser = { name: '', email: '' };

  async addUser() {
    if (!this.newUser.name || !this.newUser.email) {
      alert('Please fill in all fields');
      return;
    }
    await addDoc(usersCol, this.newUser);
    alert('User added successfully');
    this.newUser = { name: '', email: '' };
  }
}