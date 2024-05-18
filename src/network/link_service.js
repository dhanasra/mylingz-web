import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { LocalDB, USER_ID } from "./db/local_db";
import { db } from "./firebase";
import responseHandler from "../utils/response-handler";

export const saveLink = async ({ title, short, url, bioLink=false, bioLinkBtnLabel=null }) => {
  try {

    const userId = LocalDB.getItem(USER_ID)

    console.log(Date.now())

    const linkData = {  
      domain: "https://mylingz.web.app",
      url,
      title,
      short,
      bioLink,
      bioLinkBtnLabel,
      createdAt: Date.now(),
      createdBy: userId
    };
    
    const collectionRef = collection(db, "LINKS");
    await addDoc(collectionRef, linkData)

    return responseHandler(true, 'Link added successfully !');
  } catch (error) {
    return handleError(error);
  }
};

export const getLinkDetails = async ({ linkId }) => {
  try {

    const q = query(collection(db, "LINKS"), where("short", "==", linkId))
    const querySnapshot = await getDocs(q);

    let linkData = null;

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      linkData = { id: doc.id, ...data };
    }

    return responseHandler(true, 'Link details fetched successfully !', linkData);
  } catch (error) {
    return handleError(error);
  }
};


export const getLinks = async () => {
  try {

    const userId = LocalDB.getItem(USER_ID)

    const q = query(collection(db, "LINKS"), where("createdBy", "==", userId))
    const querySnapshot = await getDocs(q);

    let links = [];

    if (!querySnapshot.empty) {
      links = querySnapshot.docs.map((doc)=>{
        const data = doc.data();
        return { id: doc.id, ...data }
      })
    }

    return responseHandler(true, 'Link details fetched successfully !', links);
  } catch (error) {
    return handleError(error);
  }
};

const handleError = (error)=>{
  console.log(error)
  return responseHandler(false, error?.message, null, error.code ? error.code : 500);
}