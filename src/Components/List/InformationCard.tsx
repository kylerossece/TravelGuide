

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
  } from "@/Components/ui/card"
  import { IoStar } from "react-icons/io5";
  import { FaMapMarkerAlt } from "react-icons/fa";
  import type {LocationItem} from "@/types/location"
  import { useEffect, useRef } from "react";
  import { useTravelContext } from "@/helpers/travelContext"

const InformationCard = () => {

    const {cardLocations, locationId}  = useTravelContext();

    const cardRefs = useRef< {[key: string] : HTMLDivElement | null}>({})
    
    useEffect(() => {
      if (locationId && cardRefs.current[locationId]) {
        cardRefs.current[locationId]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, [locationId]);
    
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[40vh] sm:max-h-[70vh]">
        {cardLocations?.filter((item : LocationItem) =>  item.rating).map((item : LocationItem) => {
          return(
        <div className="h-full pb-3"  key={item.location_id} ref={(el) => {cardRefs.current[item.location_id] = el;}}>
            <Card className="group border h-full flex flex-col hover:shadow-xl transition-all duration-300 cursor-pointer"   onClick={() => window.open(item.web_url, '_blank')} >
      <CardHeader>
        <CardDescription >
        <div className="transition-all duration-300 ease-in-out group-hover:scale-90">
          <img src={item.photo?.images?.large?.url} alt={item.name} className="rounded-xl h-[275px] w-full max-w-full max-h-auto  "  />
            </div>
          </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className=" flex text-sm font-medium justify-between items-center">
            <p>{item.name}</p>
            <p>{item.price_level}</p>
        </div>
      { item.address_obj &&
        <p className=" flex items-center gap-2 text-[12px] text-gray-700"><FaMapMarkerAlt /> {item.address_obj?.street1} {item.address_obj?.street2}</p>
      } 
      </CardContent>
      <CardFooter>
      <p className="flex items-center gap-1 mb-2 text-sm text-gray-700"><IoStar className="" /> <span className="font-medium">{item.rating}</span></p>
      
      </CardFooter>
    </Card>
    </div>
          )
        })
        }
    
    
    </div>
    )
}

export default InformationCard