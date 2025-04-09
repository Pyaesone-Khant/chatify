"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { UnAuthScreen } from "../UnAuthScreen";
import { UserList } from "../UserList";
import { ChatBox } from "./ChatBox";

export function ChatLayout() {

    const { user } = useAuth();

    const [currentChat, setCurrentChat] = useState<{
        chatId: string,
        displayName: string
    } | null>(null);

    return (
        <main
            className="min-h-screen bg-blue-950 flex"
        >
            {
                user ? (
                    <section
                        className="w-full flex-1 grid grid-cols-3 "
                    >
                        <UserList
                            onSelect={(chatId: string, displayName: string) => {
                                setCurrentChat({ chatId, displayName });
                            }}
                            chatId={currentChat?.chatId || null}
                        />
                        <section
                            className="col-span-2 flex flex-col bg-black/30"
                        >
                            {
                                currentChat?.chatId ? (
                                    <ChatBox
                                        chatId={currentChat?.chatId || ""}
                                        displayName={currentChat?.displayName || "Unknown"}
                                    />
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center">
                                        <h1 className="text-3xl font-bold text-blue-100">Select a chat</h1>
                                        <p className="text-gray-400">Click on a user to start chatting</p>
                                    </div>
                                )
                            }
                        </section>
                    </section>
                ) : (
                    <UnAuthScreen />
                )
            }
        </main>
    )
}
