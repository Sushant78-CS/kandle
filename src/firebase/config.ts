// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx_BxMJhAacR9NJPFtDEcUyzEBp5Iz9Dk",
  authDomain: "kanthi-f128b.firebaseapp.com",
  projectId: "kanthi-f128b",
  storageBucket: "kanthi-f128b.firebasestorage.app",
  messagingSenderId: "770359892033",
  appId: "1:770359892033:web:d785f4ca4579f7bf914ec0",
  measurementId: "G-C83NVX98TV",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
