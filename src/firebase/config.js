
// import everyhting (*)
import * as firebase from 'firebase/app'
import {} from'firebase/storage';
import{} from 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDybjw83WSWwHY3zt07AxNC2YnIFJIBEnE",
  authDomain: "meme-generator-e9ed9.firebaseapp.com",
  projectId: "meme-generator-e9ed9",
  storageBucket: "meme-generator-e9ed9.appspot.com",
  messagingSenderId: "1034130207730",
  appId: "1:1034130207730:web:78436b030719b7cb83316b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//storage to store images  and firestore is database
// initialize services
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

//timestamp for createdAt images
const timestamp = firebase.firestore.FieldValue.serverTimestamp;


// export so that they can be used by other files
export{projectStorage, projectFirestore, timestamp };