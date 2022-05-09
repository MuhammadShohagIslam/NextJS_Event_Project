import { Fragment } from "react";
import Head from "next/head";
import Layout from "../components/layout/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <Fragment>
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
        </Fragment>
    );
}

export default MyApp;
