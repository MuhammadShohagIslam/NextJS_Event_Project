import { Fragment } from "react";
import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/event/event_list";
import EventSearch from "../../components/event/event_search";
import { useRouter } from "next/router";

function AllEventPage() {
    const events = getAllEvents();
    const route = useRouter();

    const findEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`;
        route.push(fullPath);
    };

    return (
        <Fragment>
            <EventSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </Fragment>
    );
}

export default AllEventPage;
