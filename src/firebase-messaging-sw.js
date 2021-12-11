importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js');


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

const messaging = firebase.messaging()
