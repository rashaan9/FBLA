// Firebase configuration object containing API keys and project details for connecting to Firebase services
const firebaseConfig = {
    apiKey: "AIzaSyBEz6CU3FpVw0Uk1ixvVmCci5rD2V3d0Hg",
    authDomain: "fblawebsite-83832.firebaseapp.com",
    projectId: "fblawebsite-83832",
    storageBucket: "fblawebsite-83832.firebasestorage.app",
    messagingSenderId: "737019309102",
    appId: "1:737019309102:web:4d9a73cda42247396403bf",
    measurementId: "G-RWSJV60YPB"
};

// Initialize Firebase with the configuration object
firebase.initializeApp(firebaseConfig);

// Initialize Firestore database instance for database operations
const db = firebase.firestore();

