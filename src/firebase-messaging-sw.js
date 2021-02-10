// Give the service worker (sw) access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    apiKey: "AIzaSyDhaVx4R8zOYZTohXSMilHpu8VVp0g7YHM",
    authDomain: "role-based-authorization-1694c.firebaseapp.com",
    databaseURL: "https://role-based-authorization-1694c-default-rtdb.firebaseio.com",
    projectId: "role-based-authorization-1694c",
    storageBucket: "role-based-authorization-1694c.appspot.com",
    messagingSenderId: "926671723909",
    appId: "1:926671723909:web:57572da03117aa974af8ec",
    measurementId: "G-GE2QSCSW3S"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();