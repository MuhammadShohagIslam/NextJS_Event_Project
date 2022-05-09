import { Fragment } from "react";
import { getAllEvents } from "../../helper/api_utils";
import EventList from "../../components/event/event_list";
import EventSearch from "../../components/event/event_search";
import { useRouter } from "next/router";

function AllEventPage({ events }) {
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
export async function getStaticProps() {
    const events = await getAllEvents();
    return {
        props: {
            events,
        },
    };
}

export default AllEventPage;
