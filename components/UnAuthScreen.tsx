"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Chatify } from "./common";
import { Button } from "./common/Button";

export function UnAuthScreen() {

    const { login } = useAuth();

    return (
        <section
            className=" self-center mx-auto flex-1 w-full max-w-md p-6 space-y-8"
        >
            <article
                className="space-y-2 tracking-wide"
            >
                <Chatify />
                <p
                    className="text-white/50 font-ubuntu"
                >
                    Chatify is a chat app built with Firebase and Next.js. It allows you to chat with your friends in real-time. You can also create groups and chat with multiple people at once.
                </p>
            </article>
            <article
                className="flex items-center gap-4"
            >
                <p
                    className="text-lg text-white"
                >
                    Start chatting?
                </p>
                <Button
                    onClick={login}
                >
                    Login with Google
                </Button>
            </article>
        </section >
    )
}
