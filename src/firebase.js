import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCd2JQ2urVJjL9KlDtUiH8vRcaORWPjRdw",
    authDomain: "victor-200.firebaseapp.com",
    databaseURL: "https://victor-200.firebaseio.com",
    projectId: "victor-200",
    storageBucket: "victor-200.appspot.com",
    messagingSenderId: "505356426747",
    appId: "1:505356426747:web:ca88163a72e7ba82d63f5e",
    measurementId: "G-KQ3KYVGBPH"
});
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export default { db, auth, storage }