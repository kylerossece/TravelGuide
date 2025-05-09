
import { useState, useCallback } from 'react';
import { GoogleMap, OverlayView } from '@react-google-maps/api'
import MapInterface from '../../styles/MapInterface';
// import GoogleMapReact from 'google-map-react';
import { useTravelContext } from '@/helpers/travelContext'
import type {LocationItem} from "../../types/location"
import CardMap from "./CardMap"
const containerStyle = {
  
  width: '100vw',
  height: '100vh',
}



const Map = () => {

  const { center,  bounds,  isLoaded,  mapLocations }   = useTravelContext();

  const [map, setMap] = useState<google.maps.Map | null>(null)
  console.log("map", map)


  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    let mapBounds: google.maps.LatLngBounds | null = null;
  
    if (
      bounds &&
      bounds.swLat < bounds.neLat &&
      bounds.swLng < bounds.neLng
    ) {
      const sw = new google.maps.LatLng(bounds.swLat, bounds.swLng);
      const ne = new google.maps.LatLng(bounds.neLat, bounds.neLng);
      mapBounds = new google.maps.LatLngBounds(sw, ne);
    } else if (mapLocations.length) {
      mapBounds = new google.maps.LatLngBounds();
      mapLocations.forEach((item) => {
        mapBounds!.extend(new google.maps.LatLng(Number(item.latitude), Number(item.longitude)));
      });
    }
  
    if (mapBounds) {
      mapInstance.fitBounds(mapBounds, { top: 100, bottom: 100, left: 100, right: 100 });
    } else {
      mapInstance.setCenter(center);
      mapInstance.setZoom(13);
    }
  
    setMap(mapInstance);
  }, [bounds, mapLocations, center]);

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  return isLoaded ? (
    // onBoundsChanged={handleBounds}
    // onCenterChanged={onCenterChanged}
     
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    
      options={{ disableDefaultUI: true, zoomControl: true, styles:  MapInterface 
        
      }}
    >
   { mapLocations.length && mapLocations.map((item : LocationItem) => (
    <OverlayView
    key={item.location_id}
    position={{ lat: Number(item.latitude), lng: Number(item.longitude) }}
    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
       
    <CardMap item={item} />

    </OverlayView>
   ))} 
    </GoogleMap>
   
  ) : ( 
    <></>
  )
}

export default Map