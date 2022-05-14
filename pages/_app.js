import { Fragment } from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import "../styles/globals.css";
import { NotificationContextProvider } from "../store/notification_context";

function MyApp({ Component, pageProps }) {
    return (
        <Fragment>
            <NotificationContextProvider>
                <Layout>
                    <Head>
                        {/* this head tag use whole website page if it's can not found title meta other page */}
                        <title>Next Events</title>
                        <meta name="description" content="Next JS events" />
                        <meta
                            name="viewport"
                            content="initial-scale=1.0, width=device-width"
                        />
                    </Head>
                    <Component {...pageProps} />
                </Layout>
            </NotificationContextProvider>
        </Fragment>
    );
}

export default MyApp;
