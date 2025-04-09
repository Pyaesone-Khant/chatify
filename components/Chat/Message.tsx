import { Avatar } from "@/components/common";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/services/cn";
import { formatDistanceToNowStrict } from "date-fns";

export function Message({
    message,
    owner,
}: {
    message: Message,
    owner: StoredUser
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
                <div
                    className="relative"
                >
                    <Avatar
                        src={message?.photoURL ?? "/next.svg"}
                        alt="Avatar"
                        size={36}
                    />
                    <div
                        className={cn("w-2.5 aspect-square rounded-full bg-gray-500 absolute bottom-0 right-0", {
                            "bg-green-500": (owner?.isOnline && owner?.uid === message.uid) || (user?.uid === message.uid && user?.isOnline),
                        })}
                    />
                </div>
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
