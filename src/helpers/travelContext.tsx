import { createContext, useContext } from 'react';
import { TravelContextType } from '@/types/travel';

export const TravelContext = createContext<TravelContextType | null>(null);

export const useTravelContext = () => {
    const context = useContext(TravelContext);
    if(!context) {
        throw new Error('TravelContext must be used within a TravelProvider');
    }
    return context
}