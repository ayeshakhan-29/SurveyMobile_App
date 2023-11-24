import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyC504F3NJ5upUdeQHfUFyhILW8CHLUMtfU",
  authDomain: "survey-app-ac363.firebaseapp.com",
  projectId: "survey-app-ac363",
  storageBucket: "survey-app-ac363.appspot.com",
  messagingSenderId: "751068862716",
  appId: "1:751068862716:web:54ffc6914207dfab741f79",
  measurementId: "G-X9NDN4WL0D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };