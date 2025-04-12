
export type Bounds = {
    type: string;
    neLat: number;
    neLng: number;
    swLat: number;
    swLng: number;
  };

export interface MapProps {
    center: { lat: number; lng: number };
    bounds: {   
      neLat: number;
      neLng: number;
      swLat: number;
      swLng: number; 
    };
    setBounds: (newBounds: {     
      neLat: number;
      neLng: number;
      swLat: number;
      swLng: number;} | null) => void;
    setCenter: (newCenter: { lat: number; lng: number } | null) => void; 
    isLoaded: boolean;
    loadError: Error | undefined;
  
  }