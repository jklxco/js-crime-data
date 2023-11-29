
async function getCrimeData(lat, lng){
    const date = '2023-09'
    const url = `https://data.police.uk/api/crimes-at-location?date=${date}&lat=${lat}&lng=${lng}`
    const url2 = `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${date}`
    
    const response = await fetch(url2, {mode: 'cors'})
    const crimes = await response.json();
    const crimeLngLatArray = crimes.map((item) => {
        return {lat: parseFloat(item.location.latitude), lng: parseFloat(item.location.longitude)}
    } )
    console.log(crimes)
    return crimeLngLatArray;

}

async function displayCrimesOnMap(lat, lng, map){
    const crimeLocationsArray = await getCrimeData(lat, lng)
    const {AdvancedMarkerElement, PinElement} = await google.maps.importLibrary("marker")
  
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const markers = crimeLocationsArray.map((position, i) => {
        //const label = labels[i % labels.length];
        const pinGlyph = new google.maps.marker.PinElement({
            //glyph: label,
            glyphColor: "white,"
        });
        const marker = new google.maps.marker.AdvancedMarkerElement({
            position,
            content: pinGlyph.element,
        });
        return marker
        // 
    });

    new markerClusterer.MarkerClusterer({ markers, map });

}

export default displayCrimesOnMap