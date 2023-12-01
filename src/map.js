import displayCrimesOnMap from "./api-call-crime-data.js";

let map, infoWindow;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  const options = {
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    clickableIcons:false,
    disableDefaultUI: true,
  }

  map = new Map(document.getElementById("map"), {
    center: { lat: 52.477754, lng: -1.898958 },
    zoom: 14,
    mapId: "2ae1ed055a4c88d8",
    options: options,
  });

  // ON LOAD
  const [lat, lng] = [52.477754, -1.898958]
  initAutocomplete()
  searchAreaBtn()

  let infoWindow = new google.maps.InfoWindow();

  const locationButton = document.querySelector('#location-button')

  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.panTo(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        },
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation.",
    );
    infoWindow.open(map);
}

function updateMapCenter(pos) {
  map.panTo(pos)
  
}

function initAutocomplete() {
  const input = document.getElementById("pac-input");
  const options = {
      componentRestrictions: {country: 'uk'},
      fields: ['address_components', 'geometry', 'icon', 'name'],
      strictBounds: false,
  };
  const autocomplete = new google.maps.places.Autocomplete(input, options)
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    const pos = place.geometry.location
    updateMapCenter(pos)
    displayCrimesOnMap(pos.lat(), pos.lng(), map)

  } )
}

function searchAreaBtn(){

  const searchBtn = document.querySelector('#search-btn');
  searchBtn.addEventListener('click', () => {
    console.log('searching...')
    const currentPos = map.getCenter();
    console.log(currentPos)
    displayCrimesOnMap(currentPos.lat(), currentPos.lng(), map)
  })
  

}


export {initMap};