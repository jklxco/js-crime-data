import createCrimeTable from "./list-crime-data.js"

async function getCrimeData(lat, lng){
    const date = '2023-09'
    const url = `https://data.police.uk/api/crimes-at-location?date=${date}&lat=${lat}&lng=${lng}`
    const url2 = `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${date}`
    
    const response = await fetch(url2, {mode: 'cors'})
    const crimes = await response.json();

    return crimes 

    const crimeLngLatArray = crimes.map((item) => {
        return {lat: parseFloat(item.location.latitude), lng: parseFloat(item.location.longitude)}
    } )
    console.log(crimes)
    return crimeLngLatArray;

}

async function displayCrimesOnMap(lat, lng, map){
    const crimes = await getCrimeData(lat, lng)
    const crimeLngLatArray = crimes.map((item) => {
        return {lat: parseFloat(item.location.latitude), lng: parseFloat(item.location.longitude)}
    } )
    const {AdvancedMarkerElement, PinElement} = await google.maps.importLibrary("marker")
  
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const markers = crimeLngLatArray.map((position, i) => {
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

    let algorithm = new markerClusterer.GridAlgorithm({gridSize: 45});
    
    new markerClusterer.MarkerClusterer({ markers, map, algorithm });

    createCrimeTable(crimes)
}

export default displayCrimesOnMap