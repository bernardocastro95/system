import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

let firebaseConfig = {

    apiKey: "AIzaSyC_ijagu7PeLmGTNooeLVd5kP-vPCjShbY",
  
    authDomain: "system-e63be.firebaseapp.com",
  
    projectId: "system-e63be",
  
    storageBucket: "system-e63be.appspot.com",
  
    messagingSenderId: "685511986881",
  
    appId: "1:685511986881:web:5ac7ca35d66821c53b0e40",
  
    measurementId: "G-1GZ8G66993"
  
  };
  
 if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
 }

 export default firebase;
  
  