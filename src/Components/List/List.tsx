

import { useEffect } from "react"

import { useTravelContext } from "@/helpers/travelContext"
import MoonLoader from "react-spinners/MoonLoader"
import SearchLocation from "./SearchLocation";
import SelectList from "./SelectList";
import {
  Card,
} from "@/Components/ui/card"
import InformationCard from "./InformationCard";





const List = () => {

  const { loadError, cardLocations, loading }  = useTravelContext();




if (loadError) {
  return <div>Error loading Google Maps API</div>;
}

useEffect(() =>{
  console.log("locations", cardLocations)
})


  return (

    <div className="m-5 flex flex-col gap-1">
      <Card className="p-4 mb-4">
      <SearchLocation />
      <SelectList />
    </Card>
    {loading && !cardLocations?.length ? (<MoonLoader className="mx-auto mt-3 " size={35} color="#99a1af"  /> ) : (!cardLocations?.length && <div>No Entries Found</div>)}
    <InformationCard />
    </div>
 
   
  )
}

export default List