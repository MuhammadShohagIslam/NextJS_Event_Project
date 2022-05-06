import { useRouter } from "next/router";
import { Fragment } from "react";
import { getFilteredEvents } from "./../../dummy-data";
import Button from "./../../components/ui/button";
import EventList from "../../components/event/event_list";
import ResultTitlle from "../../components/event/results_title";
import ErrorAlert from "../../components/ui/error_alert";

function FilteredEventPage() {
    const route = useRouter();
    const filterDate = route.query.slug;

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

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

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
export default FilteredEventPage;
