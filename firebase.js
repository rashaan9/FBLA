// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBEz6CU3FpVw0Uk1ixvVmCci5rD2V3d0Hg",
    authDomain: "fblawebsite-83832.firebaseapp.com",
    projectId: "fblawebsite-83832",
    storageBucket: "fblawebsite-83832.firebasestorage.app",
    messagingSenderId: "737019309102",
    appId: "1:737019309102:web:4d9a73cda42247396403bf",
    measurementId: "G-RWSJV60YPB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();
