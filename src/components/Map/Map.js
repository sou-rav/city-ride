import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '800px',
    height: '800px'
};

const center = {
    lat: 23.810331,
    lng: 90.412521
};

function Map() {
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyCbLtIbb7g5VXDwSzJN_IVD32o_iAOZJyQ"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        </LoadScript>
    )
}


export default Map;