import { Inter } from "next/font/google";
import "./globals.css";
import Head from 'next/head';
import Footer from "@/components/footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Readopia",
    description: "Created by Aditya Sawant for Aditi Mahadik",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Head>
                <title>Readopia</title>
                <meta name="description" content="Your e-commerce website description" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body className={inter.className}>
                {children}
                <Footer />

            </body>
        </html>
    );
}
