// js/logout.js
import { auth } from './firebase-config.js';
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

window.handleLogout = async function() {
  try {
    await signOut(auth);
    alert('Logged out successfully!');
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Error logging out:', error);
    alert('Error logging out: ' + error.message);
  }
};