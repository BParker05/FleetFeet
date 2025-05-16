import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Use getAuth for web/React Native
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA-6AgCe-fiH0zQ7jmtASpG9qODWAKNwpc",
  authDomain: "fleetfeet-c8d63.firebaseapp.com",
  projectId: "fleetfeet-c8d63",
  storageBucket: "fleetfeet-c8d63.appspot.com",
  messagingSenderId: "367659769357",
  appId: "1:367659769357:web:c5732554570e90825f3f44",
  measurementId: "G-RRPH1M35GW",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp); // Use getAuth for compatibility
export const db = getFirestore(firebaseApp);

export default firebaseApp;