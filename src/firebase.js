import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
