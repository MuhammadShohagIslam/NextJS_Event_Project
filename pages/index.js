import { getFeaturedEvents } from "../helper/api_utils";
import EventList from "./../components/event/event_list";

export default function HomePage({ featuredEvents }) {
    return (
        <div>
            <EventList items={featuredEvents} />
        </div>
    );
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            featuredEvents,
        },
    };
}
