// Allison Adolphson ICT 4510 Advanced Website Design & Management
// Date:  February 17, 2021
// Week Ten: Final Project
// Signature Portfolio Assignment - Restaurant Web Application
// JavaScript File for Leaflet

// Leverage Leaflet Quick Start Tutorial to Initialize Map
// Set Map View to Coordinates w/ Zoom Level
let coordinates = [31.2397, 121.4998]

// Leverage Mapbox Custom Tile Over Leaflet Map
// Set Map View to Coordinates w/ Zoom Level
let mapBoxMap = L.map('mapBoxMap').setView(coordinates, 15);

// Use Custom Mapbox Theme via Leaflet
L.tileLayer ('https://api.mapbox.com/styles/v1/alliadolphson/ckl9uzv7q1avf17nn5ui74ge9/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/streets-v11',
    tileSize: 256,
    accessToken: 'pk.eyJ1IjoiYWxsaWFkb2xwaHNvbiIsImEiOiJjajhvcWJ1ZG4wNnIzMzB1bXJ4cGtrMm51In0.hUrCwcUJTDJTR8gZ8iXfdg'
}).addTo(mapBoxMap);

// Apply Location Market
let marker2 = L.marker(coordinates).addTo(mapBoxMap);
