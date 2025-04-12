
import { useState, useCallback } from 'react';
import React from 'react'
import { GoogleMap, useJsApiLoader, Autocomplete } from '@react-google-maps/api'
import MapInterface from '../styles/MapInterface';
// import GoogleMapReact from 'google-map-react';

import type { MapProps } from '@/types/travel';

const containerStyle = {
  
  width: '100vw',
  height: '100vh',
}



const Map: React.FC<MapProps> = ({ center, setCenter, bounds, setBounds, loadError, isLoaded, }) => {
 

  const [map, setMap] = useState(null)

  const handleBounds = () => {
    if (map) {
      const mapBounds = map.getBounds();
      if (mapBounds) {
        const ne = mapBounds.getNorthEast();
        const sw = mapBounds.getSouthWest();
  
        const newBounds = {
          neLat: ne.lat(),
          neLng: ne.lng(),
          swLat: sw.lat(),
          swLng: sw.lng(),
        };
  
        if (
          !bounds ||
          newBounds.neLat !== bounds.neLat ||
          newBounds.neLng !== bounds.neLng ||
          newBounds.swLat !== bounds.swLat ||
          newBounds.swLng !== bounds.swLng
        ) {
          setBounds(newBounds);
        }
      }
    }
  };

  const onCenterChanged = () => {
    if (map) {
      const newCenter = map.getCenter(); // Converts LatLng to a plain object
      // console.log('New center:', newCenter.toJSON()); // Log the new center coordinates
      // if (newCenter) {
      //  const {lat, lng} = newCenter.toJSON()
      //  if (lat !== center.lat || lng !== center.lng) {
      //   setCenter({ lat, lng });
      // }
      // }
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
      options={{ disableDefaultUI: true, zoomControl: true, styles:  MapInterface 
        
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
   
  ) : ( 
    <></>
  )
}

export default Map