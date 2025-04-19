
import type { LocationItem } from "./location";
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
    center: { lat: number; lng: number };
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
    locationId: string;
    isLoaded: boolean;
    loadError: Error | undefined;
    cardLocations: LocationItem[] | any;
    mapLocations: LocationItem[];
    setCenter: (center: Center) => void;
    setBounds: (bounds: Bounds) => void;
    setType: (type: string) => void;
    setCardLocations: (type: LocationItem[]) => void;
    setMapLocations: (type: LocationItem[]) => void;
    setSortVal: (type :string) => void
    setLoading: (type: false) => void;
    setLocationId: (type: string) => void;
  }