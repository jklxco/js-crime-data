
async function getCrimeData(lat, lng){
    const date = '2023-09'
    const url = `https://data.police.uk/api/crimes-at-location?date=${date}&lat=${lat}&lng=${lng}`
    const url2 = `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=2023-01`
    
    const response = await fetch(url2, {mode: 'cors'})
    const crimes = await response.json();
    const crimeLngLatArray = crimes.map((item) => {
        return {lat: parseFloat(item.location.latitude), lng: parseFloat(item.location.longitude)}
    } )
    console.log(crimeLngLatArray)
    return crimeLngLatArray;

}

async function displayCrimesOnMap(lat, lng, map){
    const crimeLocationsArray = await getCrimeData(lat, lng)
    const {AdvancedMarkerElement} = await google.maps.importLibrary("marker")
  
    for(let i=0; i < crimeLocationsArray.length; i++) {
      let marker = new AdvancedMarkerElement({
        map,
        position: crimeLocationsArray[i],
      });
    }  
}

export default displayCrimesOnMap