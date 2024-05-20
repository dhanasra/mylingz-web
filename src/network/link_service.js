import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { LocalDB, USER_ID } from "./db/local_db";
import { db } from "./firebase";
import responseHandler from "../utils/response-handler";
import { URL_CONST } from "../constants/url_const";

export const saveLink = async ({ title, short, url, bioLink=false, bioLinkBtnLabel=null }) => {
  try {

    const userId = LocalDB.getItem(USER_ID)

    console.log(Date.now())

    const linkData = {  
      domain: URL_CONST.DOMAIN,
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

export const updateLink = async ({ title, short, url, id }) => {
  try {
    
    const linkData = { url, title, short };
    const docRef = doc(db, "LINKS", id);
    await updateDoc(docRef, linkData);
  
    return responseHandler(true, 'Link updated successfully !', linkData);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteLink = async (id) => {
  try {
    const docRef = doc(db, "LINKS", id);
    await deleteDoc(docRef);
  
    return responseHandler(true, 'Link deleted successfully !');
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


export const getLinkAnalytics = async ({ linkId }) => {
  try {

    const userId = LocalDB.getItem(USER_ID);

    const analyticsCollectionRef = collection(db, "ANALYTICS");
    const q = query(collection(doc(analyticsCollectionRef, userId), linkId))
    const querySnapshot = await getDocs(q);

    let today = new Date();
    let todayStart = new Date(today.setHours(0, 0, 0, 0));
    let todayEnd = new Date(today.setHours(23, 59, 59, 999));
    
    let analytics = [];
    let todayAnalytics = 0;
    let locationCounts = {};
    let deviceCounts = {};

    console.log(querySnapshot.docs)

    querySnapshot.docs.forEach(doc => {
      const data = doc.data();
      analytics.push(data);
  
      // Check if the data's dateTime is within today's range
      if (data.dateTime > todayStart && data.dateTime < todayEnd) {
          todayAnalytics++;
      }
  
      // Count occurrences of each location
      if (data.location && data.location["city"] != null) {
          let location = data.location["city"];
          locationCounts[location] = (locationCounts[location] || 0) + 1;
      }
  
      // Count occurrences of each device
      let device = data.device;
      deviceCounts[device] = (deviceCounts[device] || 0) + 1;
    });

    let mostCommonLocation = "N/A";
    if (Object.keys(locationCounts).length > 0) {
        mostCommonLocation = Object.entries(locationCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    }

    // Determine the most common device
    let mostCommonDevice = "N/A";
    if (Object.keys(deviceCounts).length > 0) {
        mostCommonDevice = Object.entries(deviceCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    }

    // Generate data for the last 7 days
    let last7DaysAnalytics = Array.from({ length: 7 }, (v, i) => {
        let dayStart = new Date(today);
        dayStart.setDate(dayStart.getDate() - (i + 1));
        dayStart.setHours(0, 0, 0, 0);

        let dayEnd = new Date(today);
        dayEnd.setDate(dayEnd.getDate() - i);
        dayEnd.setHours(0, 0, 0, 0);

        let count = 0;

        querySnapshot.docs.forEach(doc => {
            let docDateTime = new Date(doc.data().dateTime);
            if (docDateTime > dayStart && docDateTime < dayEnd) {
                count++;
            }
        });

        return { label: dayStart.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }), value: count };
    });

    const analyticsData = {
      todayClicks: todayAnalytics,
      totalClicks: analytics.length,
      device: mostCommonDevice,
      location: mostCommonLocation,
      chart: last7DaysAnalytics
    }

    return responseHandler(true, 'Link details fetched successfully !', analyticsData);
  } catch (error) {
    return handleError(error);
  }
};

const handleError = (error)=>{
  console.log(error)
  return responseHandler(false, error?.message, null, error.code ? error.code : 500);
}