// mantine css
import '@mantine/core/styles.css';

import { AuthProvider } from "@/contexts/AuthContext";
import { MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { Raleway, Ubuntu } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
    variable: "--font-raleway",
    subsets: ["latin"],
})

const ubuntu = Ubuntu({
    variable: "--font-ubuntu",
    subsets: ["latin"],
    weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
    title: "Chatify",
    description: "A chat app built with Firebase and Next.js",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={` ${raleway.className}  ${ubuntu.variable} antialiased`}
            >
                <MantineProvider>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
