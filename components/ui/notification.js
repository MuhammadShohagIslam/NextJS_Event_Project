import { useContext } from "react";
import NotificationContext from "../../store/notification_context";
import classes from "./notification.module.css";

function Notification({ title, message, status }) {
    const notificationContext = useContext(NotificationContext);

    let statusClasses = "";
    if (status === "pending") {
        statusClasses = classes.pending;
    }
    if (status === "success") {
        statusClasses = classes.success;
    }
    if (status === "error") {
        statusClasses = classes.error;
    }
    const activeClasses = `${classes.notification} ${statusClasses}`;

    function handleNotification(){
        notificationContext.hideNotification()
    }
    return (
        <div className={activeClasses} onClick={handleNotification}>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
}
export default Notification;
