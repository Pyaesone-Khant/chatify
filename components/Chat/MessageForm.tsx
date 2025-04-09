import { Button } from "@/components/common";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/libs/firebase";
import { Textarea } from "@mantine/core";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

export function MessageForm({
    chatId,
}: {
    chatId: string;
}) {

    const { user } = useAuth();
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)

    const handleSendMessage = async () => {
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
                classNames={{
                    root: "w-full"
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
