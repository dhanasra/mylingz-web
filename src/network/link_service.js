import { addDoc, collection } from "firebase/firestore";
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

const handleError = (error)=>{
  console.log(error)
  return responseHandler(false, error?.message, error.code ? error.code : 500);
}