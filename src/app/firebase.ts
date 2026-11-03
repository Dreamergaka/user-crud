import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { environment } from '../environments/environment';

const app = getApps().length ? getApp() : initializeApp(environment.firebaseConfig);
export const db = getFirestore(app);
export const usersCol = collection(db, 'users');