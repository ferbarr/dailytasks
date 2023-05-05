import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyDlpIO7LWh8c009XnNQJ58C5I1CRI1TJQM",
    authDomain: "dailytasks-app.firebaseapp.com",
    projectId: "dailytasks-app",
    storageBucket: "dailytasks-app.appspot.com",
    messagingSenderId: "355929363463",
    appId: "1:355929363463:web:0b2994a76e86c74b6306a2"
  };
  
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db=firebase.firestore()
    const auth=firebase.auth()
    const storage=firebase.storage()
    export{firebase,db,auth,storage}