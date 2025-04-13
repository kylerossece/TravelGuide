
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useRef, useState } from "react"
import { Autocomplete } from '@react-google-maps/api';
import {CategoriesData} from "../data/data"
import { useTravelContext } from "@/helpers/travelContext"
import { IoStar } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"





function List() {

  const { type, setType, isLoaded, loadError }  = useTravelContext();

  const categoriesRef = useRef(null)



  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };


 let categoriesItem = CategoriesData.map((category) => (
    <SelectItem key={category.id} value={category.value}>
      {category.name}
    </SelectItem>
 ))

 const onPlaceChanged = () => {
  if (autocomplete) {
    const place = autocomplete.getPlace();
    console.log(place);
  }
};

if (loadError) {
  return <div>Error loading Google Maps API</div>;
}

if (!isLoaded) {
  return <div>Loading...</div>;
}


 const handleCategoryChange = (value: string) => {
 
  setType(value) 
  console.log("value",value)
}
  return (

    <div className="m-5 flex flex-col gap-3">
          <div className="grid w-full max-w-sm items-center gap-1.5">
      {/* <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" /> */}
      <Autocomplete
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
    >
       <Input type="text" />
    </Autocomplete>
    </div>
    <div>
    <div>
    <Select onValueChange={handleCategoryChange} >
      <SelectTrigger className="w-full py-1">
        <SelectValue placeholder="Select Category" ref={categoriesRef}   />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>

          <SelectLabel>Category</SelectLabel> 
          {
      categoriesItem 
        
        }
         
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[600px]">
    {[1,2,3,4,5,6].map((i) => {
      return(
        <Card key={i}>
  <CardHeader>
    <CardDescription >

      <img src="https://placehold.co/1000x1000"   className="rounded-xl max-w-full h-auto "  />

      </CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col gap-2">

  <p className="text-blue-500 flex items-center gap-1"><FaMapMarkerAlt /> Marikina City</p>
  <p className="flex items-center gap-1 text-sm"><IoStar className="text-yellow-500" /> <span className="font-medium">5.0 Superb</span></p>
  </CardContent>
  <CardFooter>

  </CardFooter>
</Card>
      )
    })
    }


</div>
    </div>
 
   
  )
}

export default List