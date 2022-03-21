import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyCRIEQnuC8Ui2gL7YCsRE-FKp6XW-3rHB8',
  authDomain: 'lunar-assistant.firebaseapp.com',
  projectId: 'lunar-assistant',
  storageBucket: 'lunar-assistant.appspot.com',
  messagingSenderId: '7246416717',
  appId: '1:7246416717:web:d32082b1ffa860d9864504',
  measurementId: 'G-F17HN07TTN',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// This file is unused currently
