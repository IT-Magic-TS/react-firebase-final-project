import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCC9qHcC0K7e-m_eUSDKgIZoLTFVZsr6XU",
  authDomain: "thedojosite-deba3.firebaseapp.com",
  projectId: "thedojosite-deba3",
  storageBucket: "thedojosite-deba3.appspot.com",
  messagingSenderId: "557030878122",
  appId: "1:557030878122:web:7d96db48eabc67d42959d3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
