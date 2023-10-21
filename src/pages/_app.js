import '@/styles/globals.scss'
import Head from "next/head";

export default function App({Component, pageProps}) {
    return (
        <>
            <Head>
                <title>Стажировка - задание 6</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Component {...pageProps} />
        </>
    )
}
