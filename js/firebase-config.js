/* ═══════════════════════════════════════
   FIREBASE CONFIGURATION (OFFICIAL SECURE PROD)
   Project: infinite-web-f6860
═══════════════════════════════════════ */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp, query, orderBy, limit }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getStorage, ref, uploadBytes, getDownloadURL }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js';
import { getAnalytics, logEvent }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js';

const firebaseConfig = {
  apiKey:            "AIzaSyAMvJjqvzZF1FzcecXfVLU3qX0ocLXy4h0",
  authDomain:        "infinite-web-f6860.firebaseapp.com",
  projectId:         "infinite-web-f6860",
  storageBucket:     "infinite-web-f6860.firebasestorage.app",
  messagingSenderId: "620614036545",
  appId:             "1:620614036545:web:5c874e3da6ddb40b4deac0",
  measurementId:     "G-D2XDMKN1LX"
};

const app       = initializeApp(firebaseConfig);
const db        = getFirestore(app);
const auth      = getAuth(app);
const storage   = getStorage(app);
const analytics = getAnalytics(app);

export { app, db, auth, storage, analytics, logEvent,
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc,
  onSnapshot, serverTimestamp, query, orderBy, limit,
  signInWithEmailAndPassword, signOut, onAuthStateChanged,
  ref, uploadBytes, getDownloadURL };
