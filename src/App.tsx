import { useState, useCallback, useEffect, useRef } from 'react'
import {  useJsApiLoader } from '@react-google-maps/api'

import "./index.css"
import Map from "./Components/Map"
import List from "./Components/List"
import {getPlaces } from "./api/travelApi"
import type {Bounds, Center} from "@/types/travel"
import { TravelContext } from '@/helpers/travelContext'


function App() {




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
    <TravelContext.Provider
    value={{ center, setCenter, bounds, setBounds, type, setType, isLoaded, loadError }}>
   <main className="grid grid-cols-12 overflow-x-hidden">
  <section className="col-span-12 lg:col-span-4">
    <List 

       />
  </section>
  <section className="col-span-12 lg:col-span-8 ">
    <Map
    />
  </section>
</main>
    </TravelContext.Provider>
  ) : (
    <div>Loading...</div>
  )
}

export default App
