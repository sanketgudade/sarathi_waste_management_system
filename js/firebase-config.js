// js/firebase-config.js
// ============================================================================
// Sarathi Smart Waste Management System - Firebase Configuration
// ============================================================================
// NOTE: For security and public portfolio/resume hosting, actual API keys are 
// omitted. Replace the placeholders below with your own Firebase project credentials,
// or provide a config.js / environment object (window.__ENV__).
// ============================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: window.__ENV__?.FIREBASE_API_KEY || "YOUR_FIREBASE_API_KEY_HERE",
  authDomain: window.__ENV__?.FIREBASE_AUTH_DOMAIN || "sarathi-waste-management.firebaseapp.com",
  projectId: window.__ENV__?.FIREBASE_PROJECT_ID || "sarathi-waste-management",
  storageBucket: window.__ENV__?.FIREBASE_STORAGE_BUCKET || "sarathi-waste-management.appspot.com",
  messagingSenderId: window.__ENV__?.FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: window.__ENV__?.FIREBASE_APP_ID || "YOUR_FIREBASE_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };