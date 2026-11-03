import { Component, NgZone } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { onSnapshot, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db, usersCol } from '../firebase';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false
})
export class Tab2Page {
  users: any[] = [];

  constructor(private alertCtrl: AlertController, private ngZone: NgZone) {}

  ionViewWillEnter() {
    this.subscribeToUsers();
  }

  subscribeToUsers() {
    onSnapshot(usersCol, snapshot => {
      this.ngZone.run(() => {
        this.users = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      });
    });
  }

  async deleteUser(userId: string) {
    await deleteDoc(doc(db, 'users', userId));
  }

  async updateUser(user: any) {
    const alert = await this.alertCtrl.create({
      header: 'Update User',
      inputs: [
        { name: 'name', type: 'text', value: user.name, placeholder: 'Name' },
        { name: 'email', type: 'email', value: user.email, placeholder: 'Email' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Update',
          handler: async (data) => {
            const userRef = doc(db, 'users', user.id);
            await updateDoc(userRef, { name: data.name, email: data.email });
          }
        }
      ]
    });
    await alert.present();
  }
}