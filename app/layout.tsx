// mantine css
import '@mantine/core/styles.css';

import { theme } from '@/configs/theme.config';
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
    icons: {
        icon: "/chatify_logo.png",
    },
    keywords: ["chat", "firebase", "nextjs", "chatify"],
    openGraph: {
        images: "https://chatify.pyaesonekhant.space/chatify_logo.png",
        title: "Chatify",
        description: "A chat app built with Firebase and Next.js",
        url: "https://chatify.pyaesonekhant.space",
        siteName: "Chatify",
        type: "website",
        locale: "en_US"
    }
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
                <MantineProvider
                    theme={theme}
                >
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
