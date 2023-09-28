import { TravelActivity } from './travel-activity.model';

export interface TravelItinerary {
    activityDate: Date;
    activities: TravelActivity[];
}
