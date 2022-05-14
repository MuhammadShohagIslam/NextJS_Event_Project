import { useRef, useContext } from "react";
import NotificationContext from "../../store/notification_context";
import classes from "./newsletter_registration.module.css";

function NewsletterRegistration() {
    const notificationContext = useContext(NotificationContext);
    const inputEmailRef = useRef();

    async function handleSubmit(event) {
        event.preventDefault();
        const inputEmailValue = inputEmailRef.current.value;

        notificationContext.showNotification({
            title: "SignIn Up ...!",
            message: "Registering for Newsletter!",
            status: "pending",
        });

        // fetch("/api/newsletter", {
        //     method: "POST",
        //     body: JSON.stringify({ email: inputEmailValue }),
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // })
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((data) => {
        //         notificationContext.showNotification({
        //             title: "Success!",
        //             message: "Successfully Register for Newsletter!",
        //             status: "success",
        //         });
        //     })
        //     .catch((error) => {
        //         notificationContext.hideNotification({
        //             title: "Error!",
        //             message: error.message || "Something went wrong!",
        //             status: "error",
        //         });
        //     });
        try {
            const response = await fetch("/api/newsletter", {
                method: "POST",
                body: JSON.stringify({ email: inputEmailValue }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (response.ok) {
                return notificationContext.showNotification({
                    title: "Succes!",
                    message: "Successfully registered for newsletter!",
                    status: "success",
                });
            } else {
                throw new Error(data.message || "Something went wrong!");
            }
        } catch (error) {
            return notificationContext.showNotification({
                title: "Error!",
                message: error.message || "Something went wrong!",
                status: "error",
            });
        }
    }
    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={handleSubmit}>
                <div className={classes.control}>
                    <input
                        type="email"
                        placeholder="Your Email"
                        ref={inputEmailRef}
                    />
                    <button type="submit">Registration</button>
                </div>
            </form>
        </section>
    );
}
export default NewsletterRegistration;
