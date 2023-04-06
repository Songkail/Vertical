import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  databaseURL: "https://community-99db3-default-rtdb.firebaseio.com/",
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
