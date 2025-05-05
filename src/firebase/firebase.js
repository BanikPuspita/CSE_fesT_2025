// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFixAnOjiIGsiI41p6bcsW5QO_neDhT8I",
  authDomain: "cse-fest-2025.firebaseapp.com",
  projectId: "cse-fest-2025",
  storageBucket: "cse-fest-2025.firebasestorage.app",
  messagingSenderId: "878494660962",
  appId: "1:878494660962:web:0cd3acb1e7ccedf791d43b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(); 
export const db=getFirestore(app);

export default app;