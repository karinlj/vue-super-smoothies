import firebase from "firebase/app";
/* eslint-disable no-unused-vars */
import firestore from "firebase/firestore";
/* eslint-enable no-unused-vars */

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA3yG92T2TmhyybKh2RnLiqlHFTavfgQEA",
  authDomain: "super-smoothies-333cd.firebaseapp.com",
  databaseURL: "https://super-smoothies-333cd.firebaseio.com",
  projectId: "super-smoothies-333cd",
  storageBucket: "super-smoothies-333cd.appspot.com",
  messagingSenderId: "266565760846",
  appId: "1:266565760846:web:06b51d79b3e686becc901f",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
