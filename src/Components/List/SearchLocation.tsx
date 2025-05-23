
import { FaMapMarkerAlt } from "react-icons/fa";
import { Autocomplete } from '@react-google-maps/api';
import { useTravelContext } from "@/helpers/travelContext"
import {  useState } from "react"
import { Input } from "@/Components/ui/input"





const AutocompleteList = () => {

    const { setBounds, setCenter, setSortVal }  = useTravelContext();
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    
    setSortVal("")

    if (autocomplete) {
      const place = autocomplete.getPlace();
      const location = place.geometry?.location;
      const viewport = place.geometry?.viewport;
  
      if (location && viewport) {
        const lat = location.lat();
        const lng = location.lng();
        setCenter({ lat, lng });
  
        const ne = viewport.getNorthEast();
        const sw = viewport.getSouthWest();
  
        setBounds({
          neLat: ne.lat() + 0.05,
          neLng: ne.lng() + 0.05,
          swLat: sw.lat() - 0.05,
          swLng: sw.lng() - 0.05
        });
      } else if (location) {
        const lat = location.lat();
        const lng = location.lng();
        setCenter({ lat, lng });
  
        setBounds({
          neLat: lat + 0.05,
          neLng: lng + 0.05,
          swLat: lat - 0.05,
          swLng: lng - 0.05,
        });
      } else {
        console.error("Location not available");
      }
    }
  };
    return (
        <div className="flex gap-2 w-full  items-center">
        {/* <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" /> */}
        <FaMapMarkerAlt className="text-lg" />
        <Autocomplete
          className="flex-auto" 
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
      >
        
         <Input type="text" id="autocomplete"/>
      </Autocomplete>
      </div>
  
    )
}

export default AutocompleteList