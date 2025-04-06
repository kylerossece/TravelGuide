import { useState, useCallback, useEffect, useRef } from 'react'

import "./index.css"
import Map from "./Components/Map"
import List from "./Components/List"


function App() {
  interface Center {
    lat: number;
    lng: number;
  }

  interface Bounds {
    neLat: number;
    neLng: number;
    swLat: number;
    swLng: number;
  }

  const [center, setCenter] = useState<Center | null>(null)
  const [bounds, setBounds] = useState<Bounds | null>(null)


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


  // <div class="grid grid-cols-12 gap-y-2" >
  //          <div  :class="[item.sender === 'User' ? 'col-start-7 col-end-13' : 'col-start-1 col-end-7', 'px-3 py-0.5']">

  return center ? (
    <>
     <main className='grid grid-cols-12 overflow-hidden'>
      <div className='col-span-12 lg:col-span-4'>
    
        <List></List>
      </div>
      <div className='col-span-12 lg:col-span-8'>
      <Map 
      center={center} 
      bounds={bounds} 
      setBounds={setBounds}
      setCenter={setCenter} 
      ></Map>
      </div>
      </main>
    </>
  ) : (
    <div>Loading...</div>
  )
}

export default App
