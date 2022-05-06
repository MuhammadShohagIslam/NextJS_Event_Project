import EventItem from "./event_item";
import classes from "./event_list.module.css";

function EventList(props) {
    const { items } = props;
    console.log(items);

    return (
        <>
            <ul className={classes.list}>
                {items.map((event) => (
                    <EventItem
                        key={event.id}
                        image={event.image}
                        id={event.id}
                        title={event.title}
                        location={event.location}
                        date={event.date}
                    />
                ))}
            </ul>
        </>
    );
}
export default EventList;
