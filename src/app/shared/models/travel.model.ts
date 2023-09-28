import { TravelItinerary } from './travel-itinerary.model';
import { User } from './user.model';

export interface Travel {
    id: number;
    imageUrl: string;
    name: string;
    place: string;
    description: string;
    departureDate: Date;
    departureTime: string;
    returnDate: Date;
    returnTime: string;
    organizer: User;
    status: string;
    requiredTravelersCount: number;
    joinedTravelers: User[];
    itinerary: TravelItinerary[];
}
