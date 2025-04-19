
import {
    Card,
    CardDescription,
    CardHeader,

  } from "@/Components/ui/card"
  import { IoStar } from "react-icons/io5";
  import type {LocationItem} from "../../types/location"
  import { useTravelContext } from "@/helpers/travelContext";

const CardMap = ({item} : LocationItem | any) => {

  const { setLocationId} = useTravelContext();

  const handleLocationId = () => {

    setLocationId(item.location_id);
    
  };

    return (
        <Card onClick={handleLocationId} className="w-[90px] shadow-lg rounded-xl ">
        <CardHeader>
          <CardDescription>
            <img
              src={item.photo?.images?.large?.url}
              className="rounded-xl h-[60px] w-full object-cover"
              alt={item.name}
            />
                 <div className="flex flex-col text-[8px] gap-1 mt-2 mx-2 ">
                <p>{item.name}</p>
                <p className="flex items-center gap-1 mb-2 text-[8px]">
            <IoStar/>
            <span className="">{item.rating}</span>
          </p>
          </div>
          </CardDescription>
        </CardHeader>
      </Card>
    )
}

export default CardMap