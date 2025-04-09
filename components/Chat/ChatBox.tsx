import { db } from "@/libs/firebase";
import { cn } from "@/services/cn";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import { MessageForm } from "./MessageForm";

export function ChatBox({
    chatId,
    receiver
}: {
    chatId: string;
    receiver: StoredUser;
}) {
    const [messages, setMessages] = useState<Message[]>([]);

    const messageEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const q = query(collection(db, 'privateChats', chatId, 'messages'), orderBy('createdAt'));
        const unsubscribe = onSnapshot(q, snap => {
            setMessages(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Message[]);
        });
        return () => unsubscribe();
    }, [chatId]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages])

    return (
        <section
            className="flex flex-col flex-1 px-4 max-w-2xl mx-auto w-full gap-2 pb-4 max-h-screen"
        >
            <article
                className="bg-black/10 p-4 rounded-b-2xl"
            >
                <h1
                    className="text-2xl font-bold text-blue-100"
                >
                    {receiver.displayName}
                </h1>
                <p
                    className="text-gray-400"
                >
                    {receiver.displayName} is currently
                    <span
                        className={cn("mx-1 font-semibold", {
                            "text-green-500": receiver.isOnline,
                        })}
                    >
                        {receiver.isOnline ? "Online" : "Offline"}
                    </span>!
                </p>
            </article>
            <div
                className="flex-1 overflow-y-scroll w-full flex flex-col gap-4 p-4 border border-white/30 rounded-2xl"
            >
                {
                    messages?.map((msg) => (
                        <Message
                            key={msg.id}
                            message={msg}
                            owner={receiver}
                        />
                    ))
                }
                <div ref={messageEndRef} />
            </div>
            <MessageForm
                chatId={chatId}
            />
        </section>
    )
}
