export async function getAllEvents() {
    const response = await fetch(
        "https://clinetsidefetching-default-rtdb.firebaseio.com/events.json"
    );
    const data = await response.json();

    const events = [];
    for (let key in data) {
        events.push({
            id: key,
            ...data[key],
        });
    }
    return events;
}

export async function getFeaturedEvents() {
    const events = await getAllEvents();
    const featuredEvents = events.filter((event) => event.isFeatured === true);
    return featuredEvents;
}

export async function getEventById(eventId) {
    const events = await getAllEvents();
    const event = events.find((event) => event.id === eventId);
    return event;
}

export async function getFilteredEvents(dateObject) {
    const events = await getAllEvents();
    const { year, month } = dateObject;

    const filteredEvents = events.filter((event) => {
        const newDate = new Date(event.date);
        return (
            newDate.getFullYear() === year && newDate.getMonth() === month - 1
        );
    });
    return filteredEvents;
}
