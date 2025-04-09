import { db } from "@/libs/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import { MessageForm } from "./MessageForm";

export function ChatBox({
    chatId,
    displayName
}: {
    chatId: string;
    displayName: string;
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
            className="flex flex-col flex-1 px-4 max-w-2xl mx-auto w-full gap-2 pb-4"
        >
            <article
                className="bg-black/10 p-4 rounded-b-2xl"
            >
                <h1
                    className="text-2xl font-bold text-blue-100 text-center"
                >
                    {displayName}
                </h1>
            </article>
            <div
                className="flex-1 overflow-y-scroll w-full flex flex-col gap-4 p-4 border border-white/30 rounded-2xl"
            >
                {
                    messages?.map((msg) => (
                        <Message
                            key={msg.id}
                            message={msg}
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
