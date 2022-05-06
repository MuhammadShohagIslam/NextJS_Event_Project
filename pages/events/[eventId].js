import { useRouter } from "next/router";
import { Fragment } from "react";
import EventContent from "../../components/event_detail/event_content";
import EventLogistics from "../../components/event_detail/event_logistics";
import EventSummary from "../../components/event_detail/event_summary";
import { getEventById } from "../../dummy-data";

function DetailsEventPage() {
    const route = useRouter();
    const id = route.query.eventId;
    const event = getEventById(id);
    
    if(!event){
        return (
            <h2>Page Is Not Found</h2>
        )
    }
    return (
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics
                title={event.title}
                image={event.image}
                date={event.date}
                address={event.location}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    );
}

export default DetailsEventPage;
