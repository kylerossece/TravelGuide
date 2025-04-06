
import { useState, useCallback } from 'react';
import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
// import GoogleMapReact from 'google-map-react';

interface MapProps {
  center: { lat: number; lng: number };
  bounds: {   
    neLat: number;
    neLng: number;
    swLat: number;
    swLng: number; };
  setBounds: (newBounds: { ne: number; sw: number } | null) => void;
  setCenter: (newCenter: { lat: number; lng: number } | null) => void; 

}

const containerStyle = {
  width: '100vw',
  height: '100vh',
}



const Map: React.FC<MapProps> = ({ center, setCenter, bounds, setBounds }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_API_GOOGLE_MAPS_KEY
  })

  const [map, setMap] = useState(null)

  const handleBounds = () => {
    if(map){
      const mapBounds = map.getBounds();
      if (mapBounds) {
        const northEast = mapBounds.getNorthEast(); 
        const southWest = mapBounds.getSouthWest(); 
        const northeastLat = northEast.lat();
        const northeastLng = northEast.lng(); 
        const southwestLat = southWest.lat();
        const southwestLng = southWest.lng();
    
        setBounds({   
          neLat: northeastLat,
          neLng:  northeastLng,
          swLat: southwestLat,
          swLng: southwestLng,
    });
    console.log(bounds)
        // console.log('Northeast:', { northeastLat, northeastLng });
        // console.log('Southwest:', { southwestLat, southwestLng });
      }
    }
  }

  const onCenterChanged = () => {
    if (map) {
      const newCenter = map.getCenter(); // Converts LatLng to a plain object
      // console.log('New center:', newCenter.toJSON()); // Log the new center coordinates
      if (newCenter) {
       const latlng =newCenter.toJSON()
        // console.log("center",center)
      }
    }
  };

  const onLoad = useCallback(function callback(map) {

    const defaultBounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(defaultBounds)

    setMap(map)
  }, [center])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
  
     
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onBoundsChanged={handleBounds}
      onCenterChanged={onCenterChanged}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
   
  ) : ( 
    <></>
  )
}

export default Map