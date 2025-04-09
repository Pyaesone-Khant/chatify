import { Avatar } from "@/components/common";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/services/cn";
import { formatDistanceToNowStrict } from "date-fns";

export function Message({
    message,
}: {
    message: Message
}) {
    const { user } = useAuth();
    return (
        <div
            className={cn("flex flex-col gap-1 max-w-sm", {
                "self-end": user?.uid === message.uid,
            })}
        >
            <article
                className={cn("flex items-end gap-2", {
                    "flex-row-reverse": user?.uid === message.uid,
                })}
            >
                <Avatar
                    src={message?.photoURL ?? "/next.svg"}
                    alt="Avatar"
                    size={36}
                />
                <p
                    className="text-gray-200 bg-blue-600 p-2 px-4 rounded-xl font-raleway "
                >
                    {message.text}
                </p>
            </article>
            <p
                className={cn("text-[13px] text-gray-400 font-raleway", {
                    "text-right pr-11": user?.uid === message.uid,
                    "pl-11": user?.uid !== message.uid,
                })}
            >
                {
                    message?.createdAt?.seconds && (
                        formatDistanceToNowStrict(new Date(message?.createdAt?.seconds * 1000), {
                            addSuffix: true
                        })
                    )
                }
            </p>
        </div>
    )
}
