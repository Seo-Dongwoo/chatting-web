import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyB-Ctp8p9u2JQ9y3zNuKlDYYc_1ydeVAW8",
    authDomain: "chatting-web-7a0f5.firebaseapp.com",
    projectId: "chatting-web-7a0f5",
    storageBucket: "chatting-web-7a0f5.appspot.com",
    messagingSenderId: "20451227667",
    appId: "1:20451227667:web:84bb0fbe7682708c79e7e6",
    measurementId: "G-Z919CEE9XF",
  })
  .auth();
