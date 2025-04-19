// Import the functions you need from the SDKs you need
import {initializeApp,getApp,getApps} from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_vSDB2VOT2ocHsBw_qPq66si_amRPFio",
  authDomain: "crackwise-ca54e.firebaseapp.com",
  projectId: "crackwise-ca54e",
  storageBucket: "crackwise-ca54e.firebasestorage.app",
  messagingSenderId: "363669731328",
  appId: "1:363669731328:web:8f74be2bb3853af49bc0e5",
  measurementId: "G-LYMT4RHRLM"
};

// Initialize Firebase
const app =!getApps.length? initializeApp(firebaseConfig):getApp();

export const auth=getAuth(app);
export const db=getFirestore(app);