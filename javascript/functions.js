// Allison Adolphson ICT 4510 Advanced Website Design & Management
// Date:  February 27, 2021
// Week Ten: Final Project
// Signature Portfolio Assignment - Restaurant Web Application
// JavaScript File - General Functions for all HTML pages

// Variables
// Map Characters, Image, & Category to Menu Item
let menuData = {
  'Xiao Long Bao': {
    characters: '小笼包',
    image: 'TBD',
    category: 'apps'
  },
  'Pickled Cucumbers': {
    characters: '酱黄瓜',
    image: 'TBD',
    category: 'apps'
  }
};

// Toggle Images in HTML Based on Screen Size
function handleImageLoad () {
  // Set Images to Use By Size
  let images = [
    {
      name: 'shanghai',
      small: '../images/information/shanghai_noodles_sm.jpg',
      large: '../images/information/shanghai_noodles.jpg'
    },
    {
      name: 'wonton',
      small: '../images/information/spicy-wontons_sm.jpg',
      large: '../images/information/spicy-wontons.jpg'
    }
  ];
  images.forEach((image) => {
    let element = document.getElementById(image.name);
    if (calculateSize() === 'small') {
      // Use Small Image
      element.src = image.small;
    } else {
      // Use Large Image
      element.src = image.large;
    }
  });
}

// Calculate Screen Size for 'handleImageLoad' Function (above)
function calculateSize () {
  let screenWidth = window.innerWidth;
  if (screenWidth <= 800) {
    // Use Small Image
    return 'small';
  } else {
    // Use Large Image
    return 'large';
  }
}

// Resetting Image Size on Resize
function resetSize () {
  window.addEventListener('resize', handleImageLoad);
}

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
      // Obtain api token for later use
      let apiToken = result.user.api_key;
      // Store session token & API key to confirm user remains logged in
      sessionStorage.setItem('sessionID', sessionToken);
      sessionStorage.setItem('apiKey', apiToken);
      if (checkLoginStatus()) {
        loginRedirect();
      }
    })
    // Error Message
    .catch(() => {
      let errorMessage = document.querySelector('.errorMessage');
      errorMessage.classList.remove('hidden');
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
  
// Create a function to Redirect on Successful Login
function loginRedirect () {
  window.location = '../pages/menuForm.html';
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

// Get form values from DOM
function obtainMenuInputs () {
  let inputItemName = document.getElementById('inputItemName').value;
  let inputDescription = document.getElementById('inputDescription').value;
  let inputPrice = document.getElementById('inputPrice').value;
  return {
    item: inputItemName,
    description: inputDescription,
    price: inputPrice
  };
}

// Function to Create a Menu Item
function createMenuItem () {
  let formValues = obtainMenuInputs();
  // Create Headers
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-access-token', sessionStorage.getItem('sessionID'));
  // Create variables for Fetch Request
  let fetchDetails = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(formValues)
  };
  // Physically send to API server
  let statusCode = '';
  fetch('https://ict4510.herokuapp.com/api/menus?api_key=' + sessionStorage.getItem('apiKey'), fetchDetails)
    .then((response) => {
      statusCode = response.status;
      return response.json();
    }) .then ((result) => {
      if (statusCode === 201) {
        showMessage('.successMessage');
        clearForm();
      } else if (statusCode >= 400) {
        showMessage('.errorMessage');
      }
    }) .catch ((err) => {
      showMessage('.errorMessage');
    });
}

// Function to show success message to user if 201 received from API
function showMessage (msgId) {
  let elementMessage = document.querySelector(msgId);
  elementMessage.classList.remove('hidden');
  setTimeout(() => {
    // Add back the hidden class after timeout
    elementMessage.classList.add('hidden');
  }, 5000);
}

// Function to clear form on success
function clearForm () {
  document.getElementById('inputItemName').value = '';
  document.getElementById('inputDescription').value = '';
  document.getElementById('inputPrice').value = '';
}

// Get the Menu Items from API
function getMenuItems () {
  // Create Headers
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let fetchDetails = {
    method: 'GET',
    headers: headers
  };
  // Physically receive to API server
  fetch('https://ict4510.herokuapp.com/api/menus?api_key=' + sessionStorage.getItem('apiKey'), fetchDetails)
    .then((response) => {
      return response.json();
    }) .then ((result) => {
      displayMenuItems(result);
      initMenuFilter();
    }) .catch ((err) => {
      // AHHHHHHHHHH! FIX ME! PLEASE!!!!!;
    });
}

// Function to Display Menu Items
function displayMenuItems (result) {
  let menuItems = result.menu;
  menuItems.forEach ((menuItem) => {
    // Get Additional Data from menuData variable
    let extraData = menuData[menuItem.item];
    // Get HTML template from DOM
    let template = document.getElementById('menuCardTemplate');
    let placeholder = template.innerHTML;
    // Replace strings with values from extraData
    placeholder = placeholder.replace('CHARACTER', extraData.characters);
    placeholder = placeholder.replace('SOURCE', extraData.image);
    placeholder = placeholder.replace('CATEGORY', extraData.category);
    placeholder = placeholder.replace('ALT', menuItem.item);
    // Replace strings with values from JSON
    placeholder = placeholder.replace('ITEM', menuItem.item);
    placeholder = placeholder.replace('PRICE', menuItem.price);
    placeholder = placeholder.replace('DESCRIPTION', menuItem.description);
    // Append menu item to card in DOM
    let menuContent = document.getElementById('menuGrid');
    menuContent.innerHTML = menuContent.innerHTML + placeholder;
  });
}

// Function to Initialize Filters on Menu
function initMenuFilter () {
  console.log('Hello');
  console.log($);
  $('.menuFilterBtn').click(function (event) {
    // Determine Button Clicked by Data Category Attribute>
    console.log(event);
    var category = $(this).attr('data-category');
    console.log(category);
    // Find Tiles w/ Class Matching Clicked Data Cateogory>
    $('.menuCard').each(function (index, tile) {
      console.log(tile);
      if ($(tile).hasClass(category)) {
        $(tile).show();
      } else {
        $(tile).hide();
      }
    });
  });
}