// Allison Adolphson ICT 4510 Advanced Website Design & Management
// Date:  February 27, 2021
// Week Ten: Final Project
// Signature Portfolio Assignment - Restaurant Web Application
// JavaScript File - General Functions for all HTML pages

// Event Listener - documentReady
document.addEventListener('DOMContentLoaded', function () {
  handleImageLoad();
  resetSize();
});

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