// Allison Adolphson ICT 4510 Advanced Website Design & Management
// Date:  February 14, 2021
// Week Ten: Final Project
// Signature Portfolio Assignment - Restaurant Web Application
// JavaScript File

// Create a function to manage 'onClick' in browser
function attemptLogin () {
  // Clear any existing error messages (as applicable)
  let errorMessage = document.querySelector('.errorMessage');
  errorMessage.classList.add('hidden');
  // Obtain form values the user input & save as variable
  let username = document.querySelector('input[name="inputUsername"]').value;
  let password = document.querySelector('input[name="inputPassword"]').value;
  // doPost to send to API server
  // Create Headers
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  // Prepare form values
  let parameters = new URLSearchParams();
  parameters.append('username', username);
  parameters.append('password', password);
  // Send doPost() to API server
  // Configure fetch() request
  let fetchDetails = {
    method: 'POST',
    headers: headers,
    body: parameters
  };
  // Physically send to API server
  fetch('https://ict4510.herokuapp.com/api/login', fetchDetails)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      // Receive response from API server
      // Obtain user object of result & get token from user object
      let sessionToken = result.user.token;
      // Store session token to confirm user remains logged in
      sessionStorage.setItem('sessionID', sessionToken);
      if (checkLoginStatus()) {
        toggleLoginVisibility();
        toggleSuccessMessage();
      }
    })
  // Error Message
    .catch(() => {
      let errorMessage = document.querySelector('.errorMessage');
      errorMessage.classList.remove('hidden');
    });
}

// Create a function to hide form after successful login
function toggleLoginVisibility () {
  // Reference the HTML <div> containing login form
  let loginContainer = document.querySelector('.loginContainer');
  if (loginContainer) {
    loginContainer.classList.toggle('hidden');
  }
  // Reference the HTML <div> containing login nav and change to logout
  let elements = document.querySelectorAll('.login');
  // Loop through options to set hidden status
  elements.forEach((element) => {
    element.classList.toggle('hidden');
  });
}

// Create a function to check login status
function checkLoginStatus () {
  // Get data from Session Storage
  let data = sessionStorage.getItem('sessionID');
  // Validate Session Token included
  if (data) {
    return true;
  } else {
    return false;
  }
}

// Create a function to display Successful Login message
function toggleSuccessMessage () {
  // Reference the HTML <div> containing login success message
  let successMessage = document.querySelector('.successMessage');
  successMessage.classList.toggle('hidden');
}

// Change Login to Logout if user is logged in on site
function toggleSiteLoginVisibility () {
  if (checkLoginStatus()) {
    toggleLoginVisibility();
  }
}

// Enable user to Logout
function logoutUser () {
  // Delete token from session storage
  sessionStorage.removeItem('sessionID');
  // Redirect to Login Page
  window.location = '/pages/login.html';
}