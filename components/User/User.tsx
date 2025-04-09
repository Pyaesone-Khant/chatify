import { useAuth } from "@/contexts/AuthContext";
import { getChatId } from "@/services";
import { cn } from "@/services/cn";
import { Avatar } from "../common";

export function User({
    receiver,
    onSelect,
    isActive
}: {
    receiver: StoredUser,
    isActive: boolean,
    onSelect: (chatId: string, user: StoredUser) => void;
}) {

    const { user } = useAuth();

    return (
        <div
            className={cn("p-4 bg-blue-700/20 rounded-md cursor-pointer hover:bg-blue-700/70 duration-200 transition flex items-center gap-4", {
                "bg-white text-blue-900 hover:bg-white": isActive,
            })}
            onClick={() => onSelect(getChatId(user!.uid, receiver.uid), receiver)}
        >
            <Avatar
                src={receiver?.photoURL ?? "/next.svg"}
                alt="Avatar"
            />
            <h3
                className="text-xl font-semibold"
            >
                {receiver?.displayName}
            </h3>

            <div
                className={cn("w-3 aspect-square rounded-full bg-gray-500 ml-auto", {
                    "bg-green-500": receiver?.isOnline
                })}
            />
        </div>
    )
}
