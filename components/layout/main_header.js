import { Fragment } from "react";
import Link from "next/dist/client/link";
import classes from "./main_header.module.css";

function MainHeader() {
    return (
        <Fragment>
            <header className={classes.header}>
                <div className={classes.logo}>
                    <Link href="/">NextEvent</Link>
                </div>
                <nav className={classes.navigation}>
                    <ul>
                        <li>
                            <Link href="/events">Browse Event</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </Fragment>
    );
}
export default MainHeader;
