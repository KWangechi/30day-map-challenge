let map = document.getElementById("map");

//set map view, coordinates(latitude and longitude respectively) and zoom levels
let newMap = L.map("map").setView([-1.286389, 36.817223], 8);

//add a Tile Layer from Open Street Map(OSM)
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 30,
  attribution:
    '&copy;  <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(newMap);

//create an icon
let icon = L.icon({
  iconUrl: "./images/bank.png",
  iconSize: [25, 25],
});

//add markers and polygons in the area
// 1. Add a marker
// let marker = L.marker([-1.366111, 36.738056], {
//   icon: icon,
//   draggable: true,
// }).addTo(newMap);

// // 2. Add a circle
// let circle = L.circle([-1.311752, 36.698598], {
//   color: "blue",
//   fillColor: "#000000",
//   fillOpacity: 0.2,
//   radius: 630,
// }).addTo(newMap);

// // 3. Polygons
// let polygon = L.polygon([
//   [-1.366111, 36.738056],
//   [-1.367132, 36.739],
//   [-1.3681, 36.736],
// ]).addTo(newMap);

//attach popups
// marker.bindPopup("This is a marker poup!!").openPopup();
// circle.bindPopup("This is a circle Popup!!!");
// polygon.bindPopup("This is a polygon Popup!!!");

//get data of all the banks in Meru area and represent them using markers


let positions = [
  [-1.366111, 36.738056],
  [-1.367132, 36.739],
  [-1.3681, 36.736],
  [-1.39001, 37.736],
  [-1.45, 38.003],
  [-1.69, 39.876],
];

// positions.forEach((element) => {
//   let marker = L.marker(element, {
//     draggable: false,
//     iconSize: [10, 10],
//   }).addTo(newMap);

//   marker.bindPopup(`This marker is on coordinate ${element}`);
// });

// newMap.on("click", (e) => {
//   map.bindPopup(`You clicked at position ${e.latlng}`);
//   console.log(e.latlng);
// });

//request somethign from OSM API
// let xmlRequest = new XMLHttpRequest();

// xmlRequest.open('GET', 'http://api.openstreetmap.org/api/0.6/node/1', true, 'wangechirk123@gmail.com', 'cyqEtqCZKtT3ym9');
// xmlRequest.send();

// let requestOptions = {
//   method: "GET",
// };

// fetch(
//   "https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=rect%3A10.716463143326969%2C48.755151258420966%2C10.835314015356737%2C48.680903341613316&limit=20&apiKey=ae1f8a0efae842f89a7e1bb543c6ea25",
//   requestOptions
// )
//   .then((response) => response.json())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));

fetch("https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=rect%3A36.817223%2C-1.286389%2C37.817223%2C-1.0543&limit=200&apiKey=ae1f8a0efae842f89a7e1bb543c6ea25", {
  method: 'GET',
}).then((response) => 
  response.json()
  // console.log(response.json())
).then((result) => {
  let features = result.features
  console.log(features)

  features.forEach((element) => {
    let coordinates = {
      lat: element.properties.lat,
      lon: element.properties.lon
    }

    let supermarketName = element.properties.name;

    console.log(coordinates)
   
    //populate the map with markers in these different positions
    let newMarker = L.marker(coordinates, {
      draggable: false
    }).addTo(newMap);
    
    newMarker.bindPopup(`Supermarket name: ${supermarketName} Coordinates: ${coordinates.lat}, ${coordinates.lon}`);

  });

}


// result.forEach(element => {
//   console.log(element)
// })
).catch((errors) => 
  console.log(errors))

  
