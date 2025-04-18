import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useReducer, useEffect } from "react";
import { FaSort } from "react-icons/fa";
import { SortData } from "@/data/data";
import { useTravelContext } from "@/helpers/travelContext";
import type { LocationItem, Action } from "@/types/location";
const parseRating = (rating: string) => parseFloat(rating) || 0;
const priceLevel = (price: string) => price?.length || 0;

const locationReducer = (state : LocationItem | any, action : Action) => {
  switch (action.type) {
    case "RESET":
      return action.payload;
    case "RATINGS":
      return [...state].sort((a, b) => parseRating(b.rating) - parseRating(a.rating));
    case "INCREASING":
      return [...state].sort(
        (a, b) => priceLevel(a.price_level) - priceLevel(b.price_level)
      );
    case "DECREASING":
      return [...state].sort(
        (a, b) => priceLevel(b.price_level) - priceLevel(a.price_level)
      );
    default:
      return state;
  }
};

const Sort = () => {
  const { locations, setLocations,  sortVal, setSortVal, type} = useTravelContext();

  const [sortedLocations, dispatch] = useReducer(locationReducer, locations);


  useEffect(() => {
    if (locations.length > 0) {
      dispatch({ type: "RESET", payload: locations });
    }
  }, [locations]);


  useEffect(() => {
    if (sortedLocations.length > 0) {
      setLocations(sortedLocations);
    }
  }, [sortedLocations]);

  const handleSort = (value: string) => {
    setSortVal(value)
    dispatch({ type: value.toUpperCase() });
  };
  const filteredSortData = SortData.filter((sort) => {
    const excluded = ["decreasing", "increasing"];
    return type === "restaurants" || !excluded.includes(sort.value);
  });

  const sortItem = filteredSortData.map((sort) => (
    <SelectItem key={sort.id} value={sort.value}>
      {sort.name}
    </SelectItem>
  ));

  return (
    <div className="col-span-12 md:col-span-6 flex items-center gap-2 ms-0 md:ms-2">
      <FaSort className="text-lg" />
      <Select onValueChange={handleSort} value={sortVal}>
        <SelectTrigger className="w-full" id="sort">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by</SelectLabel>
            {sortItem}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sort;
