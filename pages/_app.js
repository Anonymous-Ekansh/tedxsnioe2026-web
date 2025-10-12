import "../styles/root/globals.scss";
import App from "next/app";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import SwiperCore, { Autoplay } from 'swiper';
import { ConfProvider } from "../context/ConfContext";
import Footer from "../components/Footer/Footer";
import HydrationWrapper from '../components/HydrationWrapper/HydrationWrapper';
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { TicketProvider } from "../context/TicketContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps, user }) {
    const getLayout = Component.getLayout || ((page) => page);
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Initialize Swiper on client-side only
        SwiperCore.use([Autoplay]);
        setIsMounted(true);
    }, []);

    return (
        <>
            <HydrationWrapper>
                <ConfProvider>
                    <TicketProvider>
                        <Head>
                            <title>TEDxShivNadarUniversity</title>
                            <meta
                                name="description"
                                content="TEDx Shiv Nadar Insitute of Eminence Annual Conference"
                            />
                            <link rel="icon" href="/favicon.ico" sizes="any" />
                            <link rel="apple-touch-icon" href="/favicon.ico" />
                            <meta name="theme-color" content="#A11D21" />
                        </Head>
                        <Navbar />
                        {isMounted ? (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={router.route}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {getLayout(<Component {...pageProps} />)}
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            getLayout(<Component {...pageProps} />)
                        )}
                        <section className="FooterSection">
                            <Footer />
                        </section>
                    </TicketProvider>
                </ConfProvider>
            </HydrationWrapper>
            {isMounted && <SpeedInsights />}
        </>
    );
}

export default MyApp;