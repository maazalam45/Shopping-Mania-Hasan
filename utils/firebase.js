
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAcLq66su_LCJ_QEwGy4sAyrcIsY5S_2jY",
    authDomain: "shopping-mania-c2c9b.firebaseapp.com",
    projectId: "shopping-mania-c2c9b",
    storageBucket: "shopping-mania-c2c9b.appspot.com",
    messagingSenderId: "266792368497",
    appId: "1:266792368497:web:328fb9ddeaa6261534ded0",
    measurementId: "G-YH2VGMD9DM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {
    auth, app
};