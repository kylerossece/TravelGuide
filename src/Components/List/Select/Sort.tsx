import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/Components/ui/select"
import { useReducer, useEffect } from "react";
import { FaSort } from "react-icons/fa";
import {SortData} from "@/data/data"
import { useTravelContext } from "@/helpers/travelContext";

const parseRating = (rating : string) => parseFloat(rating) || 0;
const priceLevelToNumber = (price : string) =>
  price?.length || 0; 

const locationReducer = (state, action) => {
  switch (action.type) {
    case "RATINGS":
      return [...state].sort(
        (a, b) => parseRating(b.rating) - parseRating(a.rating)
      );
    case "INCREASING":
      return [...state].sort(
        (a, b) =>
          priceLevelToNumber(a.price_level) - priceLevelToNumber(b.price_level)
      );
    case "DECREASING":
      return [...state].sort(
        (a, b) =>
          priceLevelToNumber(b.price_level) - priceLevelToNumber(a.price_level)
      );
    default:
      return state;
  }
};

const Sort = () => {

    
    const {locations, setLocations} = useTravelContext();
    const [sortedLocations, dispatch] = useReducer(locationReducer, locations);

    let sortItem = SortData.map((sort) =>(
        <SelectItem key={sort.id} value={sort.value}>
        {sort.name}
    </SelectItem>
    ))

    const handleSort = (value: string) => {
        switch(value){
            case "ratings" :
            dispatch({ type: "RATINGS" });
            break;

            case "increasing" :
            dispatch({ type: "INCREASING" });
            break;
            case "decreasing" :
            dispatch({ type: "DECREASING" });
            break;
            default:
            break;
        }
    }

    useEffect(() => {
        setLocations(sortedLocations);
    }, [sortedLocations])
  
 
  
    return (
        <div className="col-span-12 md:col-span-6 flex items-center gap-2 ms-0 md:ms-2">
        <FaSort className="text-lg" />
        <Select  onValueChange={handleSort}>
          <SelectTrigger className="w-full" id="sort" >
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent >
            <SelectGroup>
      
              <SelectLabel>Sort by</SelectLabel> 
              {
              sortItem
            
            }
             
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>
    )
}

export default Sort