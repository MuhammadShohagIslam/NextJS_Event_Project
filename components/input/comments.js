import { useState, useEffect, useContext } from "react";
import classes from "./comments.module.css";
import CommentList from "./comment_list";
import NewComment from "./new_comment";
import NotificationContext from "./../../store/notification_context";

function Comments({ eventId }) {
    const [commentList, setCommentList] = useState([]);
    const [showComment, setShowComment] = useState(false);
    const [loading, setLoading] = useState(false);

    const notificationContext = useContext(NotificationContext);

    useEffect(() => {
        if (showComment) {
            setLoading(true);
            fetch(`/api/comments/${eventId}`)
                .then((response) => response.json())
                .then((data) => {
                    setCommentList(data.comments);
                    setLoading(false);
                });
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
        notificationContext.showNotification({
            title: "Pending ...!",
            message: "Commenting for Event!",
            status: "pending",
        });

        try {
            const response = await fetch(`/api/comments/${eventId}`, {
                method: "POST",
                body: JSON.stringify(newComment),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (response.ok) {
                notificationContext.showNotification({
                    title: "Success!",
                    message: "Comment Successfully!",
                    status: "success",
                });
            } else {
                throw new Error(data.message || "Something Went Wrong!");
            }
        } catch (error) {
            notificationContext.showNotification({
                title: "Error!",
                message: "Commenting Failed!" || error.message,
                status: "error",
            });
        }
    }
    return (
        <section className={classes.comments}>
            <button onClick={handleShowComment}>
                {showComment ? "Hide" : "Show"}
            </button>
            {showComment && <NewComment onComment={onCommentHandler} />}
            {showComment && loading ? (
                <p>Loading ...</p>
            ) : (
                <CommentList commentList={commentList} />
            )}
        </section>
    );
}
export default Comments;
