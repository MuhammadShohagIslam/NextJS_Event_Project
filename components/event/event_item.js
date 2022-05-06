import AddressIcon from "../icons/address_icon";
import Button from "../ui/button";
import classes from "./event_item.module.css";
import ArrowRightIcon from "./../icons/arrow_right";
import DateIcon from "../icons/date_icon";

function EventItem(props) {
    const { image, title, date, location, id } = props;

    const humanReadableDate = new Date(date).toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const formattedAddress = location.replace(", ", "\n");
    const exploreLink = `/event/${id}`;
    
    return (
        <li className={classes.item}>
            <img src={"/" + image} alt={title} />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>{humanReadableDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>{formattedAddress}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={exploreLink}>
                        <span>Explore Link</span>
                        <span className={classes.icon}>
                            <ArrowRightIcon />
                        </span>
                    </Button>
                </div>
            </div>
        </li>
    );
}

export default EventItem;
