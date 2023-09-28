import { TravelActivity } from './travel-activity.model';
import { TravelItinerary } from './travel-itinerary.model';

export class TravelItineraryView implements TravelItinerary {
    activityDate: Date;
    activities: TravelActivity[];
    isCollapsed = false;

    constructor(itinerary: TravelItinerary) {
        this.activityDate = itinerary.activityDate;
        this.activities = itinerary.activities;
    }
}
