import Button from '../ui/button';
import classes from './results_title.module.css';

function ResultTitle({date}){
    const humanReadableDate = new Date(date).toLocaleDateString('tr-Turkey', {
        month: "long",
        year:"numeric"
    })
    return(
        <section className={classes.title}>
            <h1>Events in {humanReadableDate}</h1>
            <Button link="/events">Show All Events</Button>
        </section>
    )
}

export default ResultTitle;