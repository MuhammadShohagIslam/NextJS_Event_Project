import Head  from "next/head";
import { Fragment, useState } from "react";
import EventContent from "../../components/event_detail/event_content";
import EventLogistics from "../../components/event_detail/event_logistics";
import EventSummary from "../../components/event_detail/event_summary";
import Comments from "../../components/input/comments";
import { getEventById, getFeaturedEvents } from "../../helper/api_utils";

function DetailsEventPage({ event, eventId}) {

    if (!event) {
        return <h2>Loading...</h2>;
    }
    return (
        <Fragment>
            <Head>
                {/* dynamic way set head of data */}
                <title>{event.title}</title>
                <meta name="description" content={event.description} />
            </Head>
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
            <Comments eventId={event.id}/>
        </Fragment>
    );
}

export async function getStaticProps(context) {
    const { params } = context;
    const eventId = params.eventId;
    const event = await getEventById(eventId);

    return {
        props: {
            event
        },
    };
}

export async function getStaticPaths() {
    const featuredEvents = await getFeaturedEvents();
    const paths = featuredEvents.map((event) => ({
        params: { eventId: event.id },
    }));

    return {
        paths: paths,
        fallback: true,
    };
}

export default DetailsEventPage;
