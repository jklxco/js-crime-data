import displayCrimesOnMap from "./get-crime-data.js";

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
    mapId: "CRIME_MAP_ID",
    options: options,
  });

  // ON LOAD
  const [lat, lng] = [52.477754, -1.898958]
  displayCrimesOnMap(lat, lng, map);
  initAutocomplete()

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
          map.setCenter(pos);
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
  map.setCenter(pos)
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



export {initMap};