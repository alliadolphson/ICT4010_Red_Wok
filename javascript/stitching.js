// Allison Adolphson ICT 4510 Advanced Website Design & Management
// Date:  March 9, 2021
// Week Ten: Final Project
// Signature Portfolio Assignment - Restaurant Web Application
// JavaScript File - Stitching together HTML elements

// Use Ajax Request to Insert Article from carousel.html file
fetch('./pages/carousel.html')
  .then ((response) => {
    return response.text();
  })
  .then ((data) => {
    document.querySelector('#carouselFile').innerHTML = data;
    // Use Ajax Request to Insert Article from about.htmnl file
    fetch('./pages/about.html')
      .then ((response) => {
        return response.text();
      })
      .then ((data) => {
        initNav();
        document.querySelector('#aboutFile').innerHTML = data;
        // Call HandleImageLoad() so as to avoid async issues
        handleImageLoad();
        // Initialize Map so as to avoid another async issue
        initializeMap();
        // Initialize carousel... because async...
        $('.carousel').carousel();
        // Call scroll to hash
        scrollToHash();
      });
  });

// Function to scroll to a specific # in <div>
function scrollToHash () {
  let hash = window.location.hash;
  if (hash) {
    let element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView();
    }
  }
}
