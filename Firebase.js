import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'api-key',
    authDomain: 'project-id.firebaseapp.com',
    databaseURL: 'https://project-id.firebaseio.com',
    projectId: 'project-id',
    storageBucket: 'project-id.appspot.com',
    messagingSenderId: 'sender-id',
    appId: 'app-id',
    measurementId: 'G-measurement-id',
  };
  


export default class Firebase {
    static db;

    static init(){
        const app = initializeApp(firebaseConfig);
        Firebase.db = getFirestore(app)
        const analytics = getAnalytics(app);
    }
}  