// Allison Adolphson ICT 4510 Advanced Website Design & Management
// Date:  March 2, 2021
// Week Ten: Final Project
// Signature Portfolio Assignment - Restaurant Web Application
// JavaScript File

// Event Listener - documentReady
document.addEventListener('DOMContentLoaded', function () {
  // Check that User is Logged In
  if (checkLoginStatus()) {
    // If Yes
  } else {
    // If No
    window.location = '../pages/login.html';
  }
});