/* ═══════════════════════════════════════
   FIREBASE CONFIGURATION
   Replace with your actual Firebase project values
═══════════════════════════════════════ */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getStorage, ref, uploadBytes, getDownloadURL }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js';
import { getAnalytics, logEvent }
  from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js';

const firebaseConfig = {
  apiKey:            "AIzaSyAHCTeebz4pYAVnL1EsGcIjBrg44WLxELo",
  authDomain:        "myweb-66fc2.firebaseapp.com",
  projectId:         "myweb-66fc2",
  storageBucket:     "myweb-66fc2.firebasestorage.app",
  messagingSenderId: "910047422435",
  appId:             "1:910047422435:web:61e4fb5909304e3c2d22d6",
  measurementId:     "G-9ZTSL7DBJN"
};

const app       = initializeApp(firebaseConfig);
const db        = getFirestore(app);
const auth      = getAuth(app);
const storage   = getStorage(app);
const analytics = getAnalytics(app);

export { app, db, auth, storage, analytics, logEvent,
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc,
  onSnapshot, serverTimestamp,
  signInWithEmailAndPassword, signOut, onAuthStateChanged,
  ref, uploadBytes, getDownloadURL };
