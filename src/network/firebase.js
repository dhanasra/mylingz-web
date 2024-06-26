import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, query, collection, where, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBR-zBIhrphneD1LyIOj3t9942Kb7zoH1g",
  authDomain: "mylingz.firebaseapp.com",
  projectId: "mylingz",
  storageBucket: "mylingz.appspot.com",
  messagingSenderId: "834343356980",
  appId: "1:834343356980:web:cbe30093200d1222321861",
  measurementId: "G-ZRW3ZJ8LL7"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export { auth, db };

export const linkData = (short) => query(collection(db, "LINKS"), where("short", "==", short));
export const userData = (id) => query(collection(db, "USERS"), where("id", "==", id));
export const bioData = (id) => query(collection(db, "BIOLINKS"), where("bioId", "==", id));

export const bioDataDiscover = () => query(collection(db, "BIOLINKS"), where("promote", "==", true));

const analyticsCollectionRef = collection(db, "ANALYTICS");
export const analyticsData = (userId, linkId) => collection(doc(analyticsCollectionRef, userId), linkId);

export const biolinkAnalytics = (userId) => doc(analyticsCollectionRef, userId);

const biolinksCollectionRef = collection(db, "BIOLINKS");
export const messagesData = (userId) => collection(doc(biolinksCollectionRef, userId), "MESSAGES");

