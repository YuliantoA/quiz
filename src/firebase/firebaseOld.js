// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVIvtXo3_AWbj_mML1NKp1FdfFAPT6BsI",
  authDomain: "mynotification-b74ab.firebaseapp.com",
  databaseURL: "https://mynotification-b74ab.firebaseio.com",
  projectId: "mynotification-b74ab",
  storageBucket: "mynotification-b74ab.appspot.com",
  messagingSenderId: "1057042089990",
  appId: "1:1057042089990:web:385a476d96f324e1f8db87",
  measurementId: "G-ZFSLKKHQ7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app