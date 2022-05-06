import { getFeaturedEvents } from "../dummy-data";
import EventList from "./../components/event/event_list";

export default function HomePage() {
    const featuredEvents = getFeaturedEvents();
    console.log(featuredEvents);
    
    return (
        <div>
            <EventList items={featuredEvents} />
        </div>
    );
}
