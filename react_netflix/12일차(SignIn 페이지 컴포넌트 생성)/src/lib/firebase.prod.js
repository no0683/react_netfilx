import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import { seedDatabase } from '../seed';

const config = {
    apiKey: "AIzaSyDpRbymB6Ku1-4w-D4878AsY_zB0mZkcug",
    authDomain: "netflix-d7de8.firebaseapp.com",
    projectId: "netflix-d7de8",
    storageBucket: "netflix-d7de8.appspot.com",
    messagingSenderId: "822421330353",
    appId: "1:822421330353:web:924b729d033677770d0590"
};

const firebase = Firebase.initializeApp(config);

// seedDatabase(firebase);

export { firebase };