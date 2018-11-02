import * as firebase from 'firebase'

// Required for side-effects
require("firebase/firestore");
require("firebase/storage");
require("firebase/auth");

const config = {
    apiKey: "AIzaSyAXR1w3tX7tLDql3Spdq0x0E5DRlKicibg",
    authDomain: "nm-app-b80df.firebaseapp.com",
    databaseURL: "https://nm-app-b80df.firebaseio.com",
    projectId: "nm-app-b80df",
    storageBucket: "gs://nm-app-b80df.appspot.com",
    messagingSenderId: "452799787770",
  };
  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true });

export const db = firebase.firestore();

export const storage = firebase.storage();
export const auth = firebase.auth();
export default db;