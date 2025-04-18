

import { useEffect } from "react"

import { useTravelContext } from "@/helpers/travelContext"

import SearchLocation from "./SearchLocation";
import SelectList from "./SelectList";
import {
  Card,
} from "@/Components/ui/card"
import InformationCard from "./InformationCard";





const List = () => {

  const { isLoaded, loadError, locations }  = useTravelContext();




if (loadError) {
  return <div>Error loading Google Maps API</div>;
}

if (!isLoaded) {
  return <div>Loading...</div>;
}

useEffect(() =>{
  console.log("locations", locations)
})


  return (

    <div className="m-5 flex flex-col gap-1">
      <Card className="p-4 mb-4">
      <SearchLocation />
      <SelectList />
    </Card>
    <InformationCard />
    </div>
 
   
  )
}

export default List