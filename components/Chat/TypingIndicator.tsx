import { cn } from "@/services/cn"
import { Avatar } from "../common"

export function TypingIndicator({
    receiver
}: {
    receiver: StoredUser
}) {
    return (
        <div className="flex items-stretch gap-2 ">
            <div
                className="relative"
            >
                <Avatar
                    src={receiver?.photoURL ?? "/next.svg"}
                    alt="Avatar"
                    size={36}
                />
                <div
                    className={cn("w-2.5 aspect-square rounded-full bg-gray-500 absolute bottom-0 right-0", {
                        "bg-green-500": receiver?.isOnline,
                    })}
                />
            </div>
            <div className="flex items-center space-x-1.5 p-2 bg-gray-300 rounded-lg px-4">
                <span className="w-2.5 aspect-square bg-gray-500 rounded-full animate-bounce [animation-delay:-0.6s]"></span>
                <span className="w-2.5 aspect-square bg-gray-500 rounded-full animate-bounce [animation-delay:-0.45s]"></span>
                <span className="w-2.5 aspect-square bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2.5 aspect-square bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2.5 aspect-square bg-gray-500 rounded-full animate-bounce"></span>
            </div>
        </div>
    )
}
