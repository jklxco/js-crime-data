import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useState, useMemo, useCallback, useRef } from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const libaries = ['places'];

const Map = () => {
    const REACT_KEY = '';
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: REACT_KEY,
        libraries: libaries,
    })

    const containerStyle = {
        width: '100vw',
        height: '90vh'
    };

    const center = useMemo(() => ({
        lat: 52.477754,
        lng: -1.898958
    }), []);

    const options = useMemo(() => ({
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        clickableIcons:false,
        disableDefaultUI: true,
    }),[]);

    const onMapClick = useCallback((e) => {
        setMarkers(markers => [...markers, {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        },]);
    })

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
        getCrimeInfo({lat, lng});
    }, [])

    const getCrimeInfo = ({lat, lng}) => {
        const date = '2023-09'
        const url = `https://data.police.uk/api/crimes-at-location?date=${date}&lat=${lat}&lng=${lng}`
        const url2 = `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=2023-01`
        fetch(url2, {mode: 'cors'})
        .then((response) => response.json())
        .then((response) => response.map(item => {
            return {lat: parseFloat(item.location.latitude), lng: parseFloat(item.location.longitude)}
        }))
        .then((response) => {
            console.log(response)
            setMarkers(response)})
        .catch((error) => console.error(error));
    
    };

    return isLoaded ? (
        <section className='map-container'>
            <Search panTo={panTo}/>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                options={options}
                onLoad = {onMapLoad}
                onClick = {onMapClick}
            >


                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={{lat: marker.lat, lng: marker.lng}}
                        
                    />
                ))}
                    

                

                
            </GoogleMap>
        </section>
        
    ) : <></>
    
}

function Search({panTo, getCrimeInfo}) {
    const { ready,
            value,
            suggestions: {status, data},
            setValue,
            clearSuggestions
        } = usePlacesAutocomplete({
        
            requestOptions: {
            location: {lat: () => 51.5007, lng: () => 0.1246},
            radius: 200 * 1000,
        },
    });

    return (
    
        <div className="search">
            <Combobox
                onSelect={async (address) => {

                    setValue(address, false);
                    clearSuggestions();

                    try {
                        const results = await getGeocode({address});
                        const {lat, lng} = await getLatLng(results[0]);
                        panTo({lat, lng});
                        

                    } catch(error) {
                        (error) => console.error(error)
                    }
                }}
            >

                <ComboboxInput value={value} onChange={(e) => {
                    setValue(e.target.value)
                }}
                disabled={!ready}
                placeholder={"Enter an address"}
                />
                    <ComboboxPopover>
                        <ComboboxList>
                            {status === 'OK' && data.map(({id, description}) => 
                                <ComboboxOption key={id} value={description} />
                            )}
                        </ComboboxList>
                        
                    </ComboboxPopover>
            </Combobox>
        </div>
    )

}







export default Map;