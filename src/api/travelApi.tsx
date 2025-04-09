/* eslint-disable consistent-return */
import axios from 'axios';

export const getPlaces  = async (type : string, neLat : number, neLng : number, swLat: number, swLng : number) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: swLat,
        bl_longitude: swLng,
        tr_longitude: neLng,
        tr_latitude: neLat,
      },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_TRAVEL_API_KEY,
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

