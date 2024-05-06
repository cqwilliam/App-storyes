// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuri-qTMDacI8qhCIOFZ-c7kTBsRpw2ho",
  authDomain: "app-posts-story.firebaseapp.com",
  projectId: "app-posts-story",
  storageBucket: "app-posts-story.appspot.com",
  messagingSenderId: "527676053494",
  appId: "1:527676053494:web:c453bf95c91b1e3d27d9d7"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(appFirebase);
export default appFirebase;

