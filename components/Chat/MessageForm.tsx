import { Button } from "@/components/common";
import { useAuth } from "@/contexts/AuthContext";
import { db, rtdb } from "@/libs/firebase";
import { Textarea } from "@mantine/core";
import { onValue, ref as rtdbRef, set } from "firebase/database";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

export function MessageForm({
    chatId,
    receiver,
    setIsTyping
}: {
    chatId: string,
    receiver: StoredUser
    setIsTyping: (isTyping: boolean) => void
}) {

    const { user } = useAuth();
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const typingRef = rtdbRef(rtdb, `typing/${chatId}/${user?.uid}`);
    const partnerTypingRef = rtdbRef(rtdb, `typing/${chatId}/${receiver.uid}`);
    const timeoutRef = useRef(null as NodeJS.Timeout | null);

    const handleSendMessage = async () => {
        setIsTyping(false)
        setLoading(true)
        if (!message.trim()) return;
        await addDoc(collection(db, 'privateChats', chatId, 'messages'), {
            text: message,
            createdAt: serverTimestamp(),
            uid: user!.uid,
            photoURL: user!.photoURL,
        }).then(() => {
            setMessage('');
            setLoading(false)
        })
    };

    useEffect(() => {
        const unsubscribe = onValue(partnerTypingRef, (snap) => {
            setIsTyping(snap.val() === true);
        })

        return () => unsubscribe();
    }, [chatId, receiver.uid])

    const handleTyping = () => {
        set(typingRef, true);

        clearTimeout(timeoutRef.current!);
        timeoutRef.current = setTimeout(() => {
            set(typingRef, false);
        }, 1500);
    }

    return (
        <div
            className="flex items-end gap-2"
        >
            <Textarea
                placeholder="Type your message..."
                rows={1}
                maxRows={4}
                size="md"
                autosize
                classNames={{
                    root: "w-full"
                }}
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                    handleTyping();
                }}
            />
            <Button
                onClick={handleSendMessage}
                disabled={!message || message.trim() === "" || loading}
            >
                Send
            </Button>
        </div>
    )
}
