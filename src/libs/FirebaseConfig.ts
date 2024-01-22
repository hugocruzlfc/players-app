// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHyWFZ_X9C2NYsIopJRg0x7qi5CdlSMzk",
  authDomain: "players-app-18baa.firebaseapp.com",
  projectId: "players-app-18baa",
  storageBucket: "players-app-18baa.appspot.com",
  messagingSenderId: "118399136641",
  appId: "1:118399136641:web:5e54662a0061675e15ae80",
  measurementId: "G-ZLS9DS4D1L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
