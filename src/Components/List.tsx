
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

function List({type: string, setType}) {
  return (
    <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
    <div>
    <Select>
      <SelectTrigger className="">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        {/* <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem> */}
          <SelectLabel>Type</SelectLabel>
          <SelectItem value="restaurants">Restaurants</SelectItem>
          <SelectItem value="hotels">Hotels</SelectItem>
          <SelectItem value="attractions">Attractions</SelectItem>
         
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
    </div>
  )
}

export default List