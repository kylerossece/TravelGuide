

import { useEffect } from "react"

import { useTravelContext } from "@/helpers/travelContext"
import ClipLoader from "react-spinners/ClipLoader"
import SearchLocation from "./SearchLocation";
import SelectList from "./SelectList";
import {
  Card,
} from "@/Components/ui/card"
import InformationCard from "./InformationCard";





const List = () => {

  const { loadError, locations, loading }  = useTravelContext();




if (loadError) {
  return <div>Error loading Google Maps API</div>;
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
    {loading && !locations.length ? (<ClipLoader className="mx-auto" loading={loading}  /> ) : (!locations.length && <div>No Entries Found</div>)}
    <InformationCard />
    </div>
 
   
  )
}

export default List