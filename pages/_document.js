import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    // we can customize whole html document
    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <div id="overlay"></div>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
