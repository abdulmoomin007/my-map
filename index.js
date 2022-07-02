// Initialize and add the map
function initMap() {
  init();
}

window.initMap = initMap;

async function init() {
  const [lat, lng] = await getCurrentLatLng();
  pointInMap(lat, lng);
}

function pointInMap(lat, lng) {
  const currentLocation = { lat, lng };
  // The map, centered at currentLocation

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: currentLocation,
    // mapTypeId: "satellite",
    // mapTypeId: "hybrid",
  });

  // The marker, positioned at currentLocation
  points.forEach((point) => {
    const distance = getDistance(currentLocation, point);
    if (distance < 0.04)
      new google.maps.Marker({
        position: point,
        map: map,
      });
  });
  const marker = new google.maps.Marker({
    position: currentLocation,
    map: map,
  });
}

function getCurrentLatLng() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        resolve([lat, lng]);
      },
      function (err) {
        alert("Error! ", err);
        reject([0, 0]);
      }
    );
  });
}

async function getLatLngFromZipCode(zipCode) {
  let geocoder = new google.maps.Geocoder();
  let [lat, lng] = [0, 0];
  await geocoder.geocode({ address: zipCode }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      lat = results[0].geometry.location.lat();
      lng = results[0].geometry.location.lng();
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
  return [lat, lng];
}

async function pointToAddress(event) {
  event.preventDefault();
  const zipCode = document.querySelector("#pinCode").value;
  const [lat, lng] = await getLatLngFromZipCode(zipCode);
  pointInMap(lat, lng);
}

function getDistance({ lat: x1, lng: y1 }, { lat: x2, lng: y2 }) {
  const a = x1 - x2;
  const b = y1 - y2;
  return Math.sqrt(a * a + b * b);
}

const points = [
  { lat: 8.699997, lng: 77.66804 },
  { lat: 8.678277, lng: 77.711041 },
  { lat: 8.694058, lng: 77.638171 },
  { lat: 8.707209, lng: 77.691901 },
  { lat: 8.68218, lng: 77.754901 },
  { lat: 8.710433, lng: 77.66232 },
  { lat: 8.691004, lng: 77.691215 },
  { lat: 8.690071, lng: 77.653792 },
  { lat: 8.708651, lng: 77.691472 },
  { lat: 8.689646, lng: 77.733958 },
];
