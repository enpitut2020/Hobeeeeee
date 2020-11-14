import firebase from "firebase/app"
import 'firebase/firestore'
if (!firebase.apps.length) {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDVlukZaL3-jh6SAQfnsMNj_COUp67_u8I",
    authDomain: "hobeeeeee-ab30e.firebaseapp.com",
    databaseURL: "https://hobeeeeee-ab30e.firebaseio.com",
    projectId: "hobeeeeee-ab30e",
    storageBucket: "hobeeeeee-ab30e.appspot.com",
    messagingSenderId: "515820842650",
    appId: "1:515820842650:web:d9c43ac7b0d96342b87923",
    measurementId: "G-SD22L2D8H0"
  };
  firebase.initializeApp(firebaseConfig)
}
export default firebase