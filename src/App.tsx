import { useState,useEffect } from 'react'
import {  useJsApiLoader } from '@react-google-maps/api'
import PuffLoader from "react-spinners/PuffLoader"
import "./index.css"
import Map from "./Components/Map/Map"
import List from "./Components/List/List"
import {getPlaces } from "./api/travelApi"
import type {Bounds, Center} from "@/types/travel"
import { TravelContext } from '@/helpers/travelContext'
import type { LocationItem } from '@/types/location'

function App() {




  const [center, setCenter] = useState<Center | null>(null)
  const [bounds, setBounds] = useState<Bounds | null>(null)
  const [locations, setLocations] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [type, setType] = useState<string>("restaurants")
  const [sortVal, setSortVal] = useState<string>("")
  const libraries: ("places")[] = ["places"];

  useEffect(() => {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
    
        setCenter({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error(error);
        // Set default to Manila 
        const fallCent = {
          lat: 14.5995, lng: 120.9842
        }
        setCenter(fallCent);
        setBounds({
          neLat: fallCent.lat + 0.05,
          neLng: fallCent.lng + 0.05,
          swLat: fallCent.lat - 0.05,
          swLng: fallCent.lng - 0.05,
        }) 

      }
      
    );
  }
  }, []);
  //
    const { isLoaded, loadError } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey:  import.meta.env.VITE_API_GOOGLE_MAPS_KEY,
      libraries
    })

  useEffect(() => {
    if(bounds && type){
      setLocations([])
      setLoading(true);
      getPlaces(type,  bounds.neLat, bounds.neLng, bounds.swLat, bounds.swLng).then((data) => {
        setLocations(data.filter((item : LocationItem) => item.rating))
        setLoading(false)
      }).catch((err) => {
        console.log(err)
        setLoading(false)
      })
       
    }
  }, [bounds, type]);


  return center && isLoaded ? (
    <TravelContext.Provider
    value={{ center, setCenter, bounds, setBounds, type, setType, isLoaded, loadError, locations, setLocations, sortVal, setSortVal, loading, setLoading }}>
   
   <main className="grid grid-cols-12 overflow-x-hidden">

  <section className="col-span-12  lg:col-span-5">
    <List />
  </section>
  <section className="col-span-12 lg:col-span-7">
    <Map/>
  </section>
  </main>
    </TravelContext.Provider>
  ) : (
    center && 
    <PuffLoader loading={loading}  />
  )
}

export default App
