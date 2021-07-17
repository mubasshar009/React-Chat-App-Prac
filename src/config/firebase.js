import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyD5xzgazVv2IJ8R14adIlcvKy1-98pDmmA",
    authDomain: "redux-chat-app-2b571.firebaseapp.com",
    projectId: "redux-chat-app-2b571",
    storageBucket: "redux-chat-app-2b571.appspot.com",
    messagingSenderId: "766883730561",
    appId: "1:766883730561:web:09c371be31751e1258a980",
    measurementId: "G-HBL60H8W42"
};
firebase.initializeApp(firebaseConfig);
export default firebase;