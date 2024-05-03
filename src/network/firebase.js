import { initializeApp } from "firebase/app";
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

export const linkData = (short) => query(collection(db, "LINKS"), where("short", "==", short));
export const bioData = (id) => query(collection(db, "BIOLINKS"), where("bioId", "==", id));

const analyticsCollectionRef = collection(db, "ANALYTICS");
export const analyticsData = (userId, linkId) => collection(doc(analyticsCollectionRef, userId), linkId);

export const biolinkAnalytics = (userId) => doc(analyticsCollectionRef, userId);