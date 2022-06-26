// Initialize and add the map
async function initMap() {
  const [lat, lng] = await getCurrentLatLng();
  pointInMap(lat, lng);
}

window.initMap = initMap;

function pointInMap(lat, lng) {
  const currentLocation = { lat, lng };
  // The map, centered at currentLocation
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: currentLocation,
  });
  // The marker, positioned at currentLocation
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
