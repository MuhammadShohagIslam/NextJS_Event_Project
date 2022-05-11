import { Fragment } from "react";
import classes from "./comment_list.module.css";

function CommentList() {
    return (
        <Fragment>
            <ul className={classes.comments}>
                <li>
                    <p>My comment is amazing</p>
                    <div>
                        By <address>Maximilian</address>
                    </div>
                </li>
                <li>
                    <p>My comment is amazing</p>
                    <div>
                        By <address>Shohag</address>
                    </div>
                </li>
            </ul>
        </Fragment>
    );
}
export default CommentList;
