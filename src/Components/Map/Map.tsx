
import { useState, useCallback } from 'react';
import { GoogleMap, OverlayView } from '@react-google-maps/api'
import MapInterface from '../../styles/MapInterface';
// import GoogleMapReact from 'google-map-react';
import type { Bounds } from '@/types/travel';
import { useTravelContext } from '@/helpers/travelContext'
import type {LocationItem} from "../../types/location"
import CardMap from "./CardMap"
const containerStyle = {
  
  width: '100vw',
  height: '100vh',
}



const Map = () => {

  const { center, setCenter, bounds, setBounds, isLoaded, loadError, locations }   = useTravelContext();

  const [map, setMap] = useState<google.maps.Map | null>(null)

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
        } as Bounds;
  
        if (
          !bounds 
        ) {
          setBounds(newBounds);
        }
      }
    }
  };

  // const onCenterChanged = () => {
  //   if (map) {
  //     const newCenter = map.getCenter(); 
  //     console.log('New center:', newCenter.toJSON()); 
  //      const {lat, lng} = newCenter.toJSON()
  //      if (lat !== center.lat || lng !== center.lng) {
  //       setCenter({ lat, lng });
  //     }
  //     }
  //   }
  // };

  const onLoad = useCallback((map: google.maps.Map) => {
    if (bounds) {
      const sw = new google.maps.LatLng(bounds.swLat, bounds.swLng);
      const ne = new google.maps.LatLng(bounds.neLat, bounds.neLng);
      const mapBounds = new google.maps.LatLngBounds(sw, ne);
      map.fitBounds(mapBounds);
    } else {
      const defaultBounds = new google.maps.LatLngBounds(center);
      map.fitBounds(defaultBounds);
    }
  
    setMap(map);
  }, [bounds, center]);

  const onUnmount = useCallback(function callback() {
    setMap(null)
  }, [])

  return isLoaded ? (
    // onBoundsChanged={handleBounds}
    // onCenterChanged={onCenterChanged}
     
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}

      options={{ disableDefaultUI: true, zoomControl: true, styles:  MapInterface 
        
      }}
    >
   { locations.map((item : LocationItem) => (
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