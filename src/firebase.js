// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCPEC0O18s_0iYOvc5m0vY0QdnYbVFJytM',
  authDomain: 'crowdfunding-61d5f.firebaseapp.com',
  projectId: 'crowdfunding-61d5f',
  storageBucket: 'crowdfunding-61d5f.appspot.com',
  messagingSenderId: '632863513851',
  appId: '1:632863513851:web:e10cd2fb7ac92714d4645e',
  measurementId: 'G-TMX4LHSLS3',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
