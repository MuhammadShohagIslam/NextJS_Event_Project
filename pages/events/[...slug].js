import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import useSWR from "swr";
import Button from "./../../components/ui/button";
import EventList from "../../components/event/event_list";
import ResultTitlle from "../../components/event/results_title";
import ErrorAlert from "../../components/ui/error_alert";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function FilteredEventPage() {
    const [events, setEvents] = useState();
    const route = useRouter();
    const filterDate = route.query.slug;
    // // if we do not want to set SEO on the page, use cases below
    const { data, error } = useSWR(
        "https://clinetsidefetching-default-rtdb.firebaseio.com/events.json",
        fetcher
    );
    useEffect(() => {
        if (data) {
            const events = [];
            for (let key in data) {
                events.push({
                    id: key,
                    ...data[key],
                });
            }
            setEvents(events);
        }
    }, [data]);

    let headData = (
        <Head>
            <title>{`Filtered Events`}</title>
            <meta name="description" content={`All list of filtered events`} />
        </Head>
    );

    if (!filterDate || !events) {
        return (
            <Fragment>
                {headData}
                <p className="center">Loading...</p>
            </Fragment>
        );
    }
    const filteredYear = filterDate[0];
    const filteredMonth = filterDate[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    headData = (
        <Head>
            <title>{`Filtered Events with ${numYear}/${numMonth}`}</title>
            <meta
                name="description"
                content={`This is about filtered event with ${numYear}/${numMonth}`}
            />
        </Head>
    );

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numMonth > 12 ||
        numMonth < 1
    ) {
        return (
            <Fragment>
                {headData}
                <ErrorAlert>
                    <p className="center">
                        Invalid Filtered, Please adjust your value!
                    </p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const filteredEvents = events.filter((event) => {
        const newDate = new Date(event.date);
        return (
            newDate.getFullYear() === numYear &&
            newDate.getMonth() === numMonth - 1
        );
    });

    if (!filteredEvents || filteredEvents.length === 0 || error) {
        return (
            <Fragment>
                {headData}
                <ErrorAlert>
                    <p className="center">
                        No events found for the chosen filtered!
                    </p>
                </ErrorAlert>

                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }
    const date = new Date(numYear, numMonth - 1);

    return (
        <Fragment>
            {headData}
            <ResultTitlle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    );
}

// if we want to set SEO on the page, use cases below
// export async function getServerSideProps(context) {
//     const { params } = context;
//     const filterDate = params.slug;

//     const filteredYear = filterDate[0];
//     const filteredMonth = filterDate[1];

//     const numYear = +filteredYear;
//     const numMonth = +filteredMonth;

//     if (
//         isNaN(numYear) ||
//         isNaN(numMonth) ||
//         numYear > 2030 ||
//         numMonth > 12 ||
//         numMonth < 1
//     ) {
//         return {
//             redirect:{
//                 destination: "/"
//             },
//             notFound:true
//         }
//     }
//     const filteredEvents = await getFilteredEvents({
//         year: numYear,
//         month: numMonth,
//     });

//     return {
//         props: {
//             filteredEvents,
//             numMonth,
//             numYear,
//         },
//     };
// }

export default FilteredEventPage;
