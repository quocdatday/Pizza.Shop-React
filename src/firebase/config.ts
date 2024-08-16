// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https:firebase.google.com/docs/web/setup#available-libraries

//Firebase 1
const firebaseConfig = {
    apiKey: "AIzaSyDUYTMH7tfbruTLSEeGlB7Lup_HkEtlMik",
    authDomain: "pizzashop-8164a.firebaseapp.com",
    projectId: "pizzashop-8164a",
    storageBucket: "pizzashop-8164a.appspot.com",
    messagingSenderId: "231136336889",
    appId: "1:231136336889:web:c6ef6334624bbb47f33b28"
  };

//Firebase 2
// const firebaseConfig = {
//   apiKey: "AIzaSyD6R4WQI7dTSuoq7GZu_oyAC-BWhuMrBuw",
//   authDomain: "pizzashop02-17bf2.firebaseapp.com",
//   projectId: "pizzashop02-17bf2",
//   storageBucket: "pizzashop02-17bf2.appspot.com",
//   messagingSenderId: "290734124904",
//   appId: "1:290734124904:web:9cb215645e22273340b0dd"
// };


// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

