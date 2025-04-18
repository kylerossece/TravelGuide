
export type Bounds = {
    type?: string;
    neLat: number;
    neLng: number;
    swLat: number;
    swLng: number;
  };

export interface Center {
    lat: number;
    lng: number;
  }

export interface MapProps {
    center: { lat: number; lng: number } | null;
    bounds: {   
      neLat: number;
      neLng: number;
      swLat: number;
      swLng: number; 
    } | null;
    setBounds: (bounds: Bounds | null) => void;
    setCenter:  (center: Center | null) => void;
    isLoaded: boolean;
    loadError: Error | undefined;
  
  }

export interface ListProps {
    type: string;
    setType: (value: string) => void; 
    isLoaded: boolean;
    loadError: Error | undefined;
    
  }

export interface TravelContextType {
    center: Center ;
    setCenter: (center: Center) => void;
    bounds: Bounds | null;
    setBounds: (bounds: Bounds) => void;
    type: string;
    setType: (type: string) => void;
    isLoaded: boolean;
    loadError: Error | undefined;
    locations: any | null;
    setLocations: (type: any) => void;
  }