import { useState, useCallback, useEffect, useRef } from 'react'
import {  useJsApiLoader } from '@react-google-maps/api'

import "./index.css"
import Map from "./Components/Map"
import List from "./Components/List"
import {getPlaces } from "./api/travelApi"
import type {Bounds} from "@/types/travel"


function App() {
  interface Center {
    lat: number;
    lng: number;
  }



  const [center, setCenter] = useState<Center | null>(null)
  const [bounds, setBounds] = useState<Bounds | null>(null)
  const [locations, setLocations] = useState<any[]>([])
  const [type, setType] = useState<string>("restaurants")


  useEffect(() => {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
    
        setCenter({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error(error);
        // Set default to Manila 
        setCenter({ lat: 14.5995, lng: 120.9842 });
      }
      
    );
  }
  }, []);
  //
    const { isLoaded, loadError } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey:  import.meta.env.VITE_API_GOOGLE_MAPS_KEY,
      libraries: ['places'],
    })

  // useEffect(() => {
  //   console.log("bounds", bounds)
  //   if(bounds){
  //     getPlaces(type,  bounds.neLat, bounds.neLng, bounds.swLat, bounds.swLng).then((data) => setLocations(data))
       
  //   }
  // }, []);


  return center ? (
    <>
   <main className="grid grid-cols-12 overflow-x-hidden">
  <div className="col-span-12 lg:col-span-4">
    <List 
      type={type} 
      setType={setType}  
      isLoaded={isLoaded}
      loadError={loadError} 
       />
  </div>
  <div className="col-span-12 lg:col-span-8 ">
    <Map
      center={center}
      bounds={bounds}
      setBounds={setBounds}
      setCenter={setCenter}
      isLoaded={isLoaded}
      loadError={loadError}

    />
  </div>
</main>
    </>
  ) : (
    <div>Loading...</div>
  )
}

export default App
