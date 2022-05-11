import Head from 'next/head'
import NewsletterRegistration from '../components/input/newsletter_registration';
import { getFeaturedEvents } from "../helper/api_utils";
import EventList from "./../components/event/event_list";

export default function HomePage({ featuredEvents }) {
    return (
        <div>
            <Head>
                <title>Featured Events</title>
                <meta name='description' content='This is about featured events' />
            </Head>
            <NewsletterRegistration/>
            <EventList items={featuredEvents} />
        </div>
    );
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            featuredEvents,
        },
    };
}
