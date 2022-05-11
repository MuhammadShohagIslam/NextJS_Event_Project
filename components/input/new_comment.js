import { useRef } from "react";
import classes from "./new_comment.module.css";

function NewComment({ onComment }) {
    const inputEmailRef = useRef();
    const inputNameRef = useRef();
    const inputCommentRef = useRef();

    function handleCommentSubmit(event) {
        event.preventDefault();
        const inputEmailValue = inputEmailRef.current.value;
        const inputNameValue = inputNameRef.current.value;
        const inputCommenValue = inputCommentRef.current.value;
        onComment({
            email: inputEmailValue,
            name: inputNameValue,
            comment: inputCommenValue,
        });
    }
    return (
        <form className={classes.form} onSubmit={handleCommentSubmit}>
            <div className={classes.row}>
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" ref={inputEmailRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" ref={inputNameRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="comment">Your Comment</label>
                    <textarea id="comment" rows="5" ref={inputCommentRef}/>
                </div>
            </div>
            <button type="submit" className={classes.newCommentButton}>Submit</button>
        </form>
    );
}
export default NewComment;
