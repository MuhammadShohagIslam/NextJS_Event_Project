import { Fragment } from "react";
import classes from "./comment_list.module.css";

function CommentList({ commentList }) {
    return (
        <Fragment>
            <ul className={classes.comments}>
                {commentList &&
                    commentList.map((comment) => (
                        <li key={comment._id}>
                            <p>{comment.comment}</p>
                            <div>
                                By <address>{comment.name}</address>
                            </div>
                        </li>
                    ))}
            </ul>
        </Fragment>
    );
}
export default CommentList;
