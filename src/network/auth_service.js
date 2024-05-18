import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { LocalDB, USER, USER_ID } from './db/local_db';
import { auth, db } from './firebase';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import responseHandler from '../utils/response-handler';

export const signup = async ({ firstname, lastname, email, password }) => {
  try {
    const resp = await createUserWithEmailAndPassword(auth, email, password);
    const userId = resp.user.uid;

    const userData = { firstname, lastname, email, id: userId, provider: 'google' }

    const collectionRef = collection(db, "USERS");
    await addDoc(collectionRef, userData)

    return handleSuccess(userData, "Account Created Successfully !")
  } catch (error) {
    return handleError(error);
  }
};

export const login = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(auth, email, password);
    const userId = resp.user.uid;

    const docRef = doc(db, "USERS", userId)
    const user = await getDoc(docRef);

    return handleSuccess(user, "Logged in Successfully !")
  } catch (error) {
    return handleError(error);
  } 
};

const getUserRecord = async(user, type)=>{
  
  const docSnap = await getDoc(doc(db, "USERS", user.uid));

  if(docSnap.exists()){
    return docSnap.data();
  }else{
    const userData = { 
      firstname: user.displayName.split(" ")[0], 
      lastname: user.displayName.split(" ")[1], 
      email: user.email, 
      emailVerified: user.emailVerified,
      id: user.uid, 
      picture: user.photoURL,
      phoneNumber: user.phoneNumber,
      provider: type
    }

    const collectionRef = collection(db, "USERS");
    await addDoc(collectionRef, userData)
    return userData;
  } 
}

export const googleLogin = async ()=>{
  try {
    const provider = new GoogleAuthProvider();
    const resp = await signInWithPopup(auth, provider);
    const user = await getUserRecord(resp.user, 'google');
    return handleSuccess(user, "Logged in Successfully !")
  } catch (error) {
    return handleError(error);
  }
}

export const githubLogin = async ()=>{
  try {
    const provider = new GithubAuthProvider();
    const resp = await signInWithPopup(auth, provider);
    const user = await getUserRecord(resp.user, 'github');
    return handleSuccess(user, "Logged in Successfully !")
  } catch (error) {
    return handleError(error);
  }
}

const handleSuccess = (user, message)=>{

  LocalDB.setItem(USER_ID, user.id);
  LocalDB.setItem(USER, user);

  return responseHandler(true, message);
}

const handleError = (error)=>{
  console.log(error)
  return responseHandler(false, error?.message, error.code ? error.code : 500);
}

export const forgotPassword = async(email)=>{
  try{
    await sendPasswordResetEmail(auth, email);
    return responseHandler(true, 'Mail sent successfully !');;
  }catch(error){
    return handleError(error);
  }
}