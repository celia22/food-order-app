import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCYAWF3zAG5gCnpMyc3eIu4FIzfFXfeHrA",
    authDomain: "hairfy-31f27.firebaseapp.com",
    databaseURL: "https://hairfy-31f27.firebaseio.com",
    projectId: "hairfy-31f27",
    storageBucket: "hairfy-31f27.appspot.com",
    messagingSenderId: "54165143718",
    appId: "1:54165143718:web:97ea13e0ccc5dd1b8f3467",
    measurementId: "G-YBX2JC4T35"
})

export const db = firebaseApp.firestore();
const auth = firebase.auth();
export const storage = firebase.storage()

export default auth