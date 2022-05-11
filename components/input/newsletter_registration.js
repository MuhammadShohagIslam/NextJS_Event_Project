import { useRef } from "react";
import classes from "./newsletter_registration.module.css";

function NewsletterRegistration() {
    const inputEmailRef = useRef();

    async function handleSubmit(event) {
        event.preventDefault();
        
        const inputEmailValue = inputEmailRef.current.value;
        const response = await fetch(
            "/api/newsletter",
            {
                method: "POST",
                body : JSON.stringify({email: inputEmailValue}),
                headers:{
                    "Content-Type": "application/json",
                }
            }
        );
        const data = await response.json();
        console.log(data);
    }
    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onClick={handleSubmit}>
                <div className={classes.control}>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your Email"
                        aria-label="Your Email"
                        ref={inputEmailRef}
                    />
                    <button type="submit">Registration</button>
                </div>
            </form>
        </section>
    );
}
export default NewsletterRegistration;
