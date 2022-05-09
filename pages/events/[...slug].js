import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { getFilteredEvents } from "../../helper/api_utils";
import Button from "./../../components/ui/button";
import EventList from "../../components/event/event_list";
import ResultTitlle from "../../components/event/results_title";
import ErrorAlert from "../../components/ui/error_alert";



function FilteredEventPage() {
    const[loading, setLoading] = useState(false)
   const [filteredEvents, setFilteredEvents] = useState();
    const route = useRouter();
    const filterDate = route.query.slug;
    // // if we do not want to set SEO on the page, use cases below
    useEffect(()=> {
        setLoading(true);
        async function getData(){
            const filteredEvents =await getFilteredEvents({
                year: numYear,
                month: numMonth
            })
            setFilteredEvents(filteredEvents);
            setLoading(false);
        }
        getData();
    }, [])

    if (!filterDate) {
        return <p className="center">Loading...</p>;
    }
    const filteredYear = filterDate[0];
    const filteredMonth = filterDate[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numMonth > 12 ||
        numMonth < 1
    ) {
        return (
            <Fragment>
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

    if (loading) {
        return <p className="center">Loading...</p>;
    }

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
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
