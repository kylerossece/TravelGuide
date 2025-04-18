
import { useRef } from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/Components/ui/select"

import { BiSolidCategory } from "react-icons/bi";
import {CategoriesData} from "@/data/data"
import { useTravelContext } from "@/helpers/travelContext";





  
  
const Categories = () => {

    const { type, setType }  = useTravelContext();
    const categoriesRef = useRef(null)
    
let categoriesItem = CategoriesData.map((category) => (
    <SelectItem key={category.id} value={category.value}>
      {category.name}
    </SelectItem>
 ))

 const handleCategoryChange = (value: string) => {
 
    setType(value) 
    console.log("value",value)
  }

    return (
        <div className="col-span-12 md:col-span-6 flex items-center gap-2">
        <BiSolidCategory className="text-lg" />
        <Select onValueChange={handleCategoryChange}  value={type}  >
          <SelectTrigger className="w-full" id="category" >
            <SelectValue placeholder="Select Category" ref={categoriesRef}    />
          </SelectTrigger>
          <SelectContent >
            <SelectGroup>
      
              <SelectLabel>Category</SelectLabel> 
              {
          categoriesItem 
            
            }
             
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>
    )
}

export default Categories