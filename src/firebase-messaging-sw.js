importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBt2nygarCmHUE_yr9UT9l7ziIcxuP4ThY",
  authDomain: "pnsq-1cd2f.firebaseapp.com",
  databaseURL: "https://pnsq-1cd2f-default-rtdb.firebaseio.com",
  projectId: "pnsq-1cd2f",
  storageBucket: "pnsq-1cd2f.appspot.com",
  messagingSenderId: "449724327328",
  appId: "1:449724327328:web:dbd00843604a38ad7830c5",
  measurementId: "G-0CL4SG1T20"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
