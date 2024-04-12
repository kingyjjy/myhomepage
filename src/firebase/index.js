// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey:` ${process.env.REACT_APP_APIKEY}`,
  authDomain: `${process.env.REACT_APP_AUTHDOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECTID}`,
  storageBucket: `${process.env.REACT_APP_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGINGSENDERID}`,
  appId: `${process.env.REACT_APP_APPID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENTID}`
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app); // auth 통해서 가져옴
const storage = getStorage(app);
const db = getFirestore(app);
// 내보내기
export { auth, storage, db } 