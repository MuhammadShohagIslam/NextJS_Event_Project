import { useState, useEffect } from "react";
import classes from "./comments.module.css";
import CommentList from "./comment_list";
import NewComment from "./new_comment";

function Comments({ eventId }) {
    const [commentList, setCommentList] = useState([]);
    const [showComment, setShowComment] = useState(false);

    useEffect(() => {
        if (showComment) {
            fetch(`/api/comments/${eventId}`)
                .then((response) => response.json())
                .then((data) => setCommentList(data.comments));
        }
    }, [showComment]);

    function handleShowComment() {
        setShowComment((prevComment) => !prevComment);
    }
    async function onCommentHandler(commentObject) {
        const { email, name, comment } = commentObject;
        const newComment = {
            email,
            name,
            comment,
        };
        fetch(`/api/comments/${eventId}`, {
            method: "POST",
            body: JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    }
    return (
        <section className={classes.comments}>
            <button onClick={handleShowComment}>
                {showComment ? "Hide" : "Show"}
            </button>
            {showComment && <NewComment onComment={onCommentHandler} />}
            {showComment && <CommentList commentList={commentList} />}
        </section>
    );
}
export default Comments;
