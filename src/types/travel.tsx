
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
    sortVal: string;
    bounds: Bounds | null;
    type: string;
    loading: boolean;
    isLoaded: boolean;
    loadError: Error | undefined;
    locations: any | null;
    setCenter: (center: Center) => void;
    setBounds: (bounds: Bounds) => void;
    setType: (type: string) => void;
    setLocations: (type: any) => void;
    setSortVal: (type :string) => void
    setLoading: (type: false) => void;
  }