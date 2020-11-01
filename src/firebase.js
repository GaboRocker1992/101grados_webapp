import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCzK0CZ6FjxPT5pKCff20Y8niADj756H7E",
    authDomain: "imgrepository.firebaseapp.com",
    databaseURL: "https://imgrepository.firebaseio.com",
    projectId: "imgrepository",
    storageBucket: "imgrepository.appspot.com",
    messagingSenderId: "789229981676",
    appId: "1:789229981676:web:76017361716e49a2733ac9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 export default firebase;