"use client";

import dynamic from "next/dynamic";

const ChatLayout = dynamic(
    () => import('@/components/Chat/ChatLayout').then((mod) => mod.ChatLayout),
    { ssr: false }
)

export default function Home() {
    return (
        <ChatLayout />
    );
}
