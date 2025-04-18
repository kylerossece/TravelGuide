export interface Address {
    street1?: string;
    street2?: string;
  }
  
export interface Photo {
    images?: {
      large?: {
        url?: string;
      };
    };
  }
  
export interface LocationItem {
    location_id: string;
    name: string;
    address_obj?: Address;
    photo?: Photo;
    rating?: string;
    price_level?: string;
    latitude: number;
    longitude: number
  }