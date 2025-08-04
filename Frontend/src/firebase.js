import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDYynLTwwYWBZPpfLnS0FE1xVMLqWL_cd8",
    authDomain: "student-teacher-appointm-fe8bb.firebaseapp.com",
    projectId: "student-teacher-appointm-fe8bb",
    storageBucket: "student-teacher-appointm.appspot.com",
    messagingSenderId: "916756906179",
    appId: "1:916756906179:web:90f323ad23badb7da56276"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);