import { useState } from "react";
import CommentList from "./comment_list";
import NewComment from "./new_comment";
import classes from "./comments.module.css";

function Comments({ eventId }) {
    const [showComment, setShowComment] = useState(false);

    function handleShowComment() {
        setShowComment((prevComment) => !prevComment);
    }
    async function onCommentHandler(commentObject) {
        const { email, name, comment } = commentObject;
        const newComment = {
            email,
            name,
            comment
        };
        const response = await fetch(`/api/comments/${eventId}`, {
            method: "POST",
            body: JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);

        const commentResponse = await fetch(`/api/comments/${eventId}`);
        const commentList = await commentResponse.json();
        console.log(commentList);
    }
    return (
        <section className={classes.comments}>
            <button onClick={handleShowComment}>
                {showComment ? "Hide Comment" : "Show Comment"}
            </button>
            {showComment && <NewComment onComment={onCommentHandler} />}
            {showComment && <CommentList />}
        </section>
    );
}
export default Comments;
