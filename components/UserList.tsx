"use client";

import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/libs/firebase";
import { getChatId } from "@/services";
import { cn } from "@/services/cn";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Avatar, Chatify } from "./common";
import { LogoutModal } from "./LogoutModal";

type UserListProps = {
    onSelect: (chatId: string, displayName: string) => void;
    chatId: string | null;
}

export function UserList({
    onSelect,
    chatId
}: UserListProps) {

    const { user } = useAuth();
    const [users, setUsers] = useState<StoredUser[]>([]);

    useEffect(() => {
        const loadUsers = async () => {
            const snap = await getDocs(collection(db, 'users'));
            const allUsers = snap.docs.map(doc => doc.data()).filter(u => u.uid !== user?.uid);
            setUsers(allUsers as StoredUser[]);
        }
        loadUsers();
    }, []);

    return (
        <section
            className="flex flex-col border-r border-white/30 h-screen"
        >
            <article
                className="flex items-center justify-between gap-4 p-6 border-b border-white/20 "
            >
                <Chatify
                    size="md"
                />
                <LogoutModal />
            </article>


            <div className="flex-1 overflow-y-scroll w-full flex flex-col gap-4 p-6 ">
                {
                    users.map((u, i) => (
                        <div
                            key={i}
                            className={cn("p-4 bg-blue-700/20 rounded-md cursor-pointer hover:bg-blue-700/70 duration-200 transition flex items-center gap-4", {
                                "bg-blue-700/70": chatId === u.uid,
                            })}
                            onClick={() => onSelect(getChatId(user!.uid, u.uid), u.displayName)}
                        >
                            <Avatar
                                src={u?.photoURL ?? "/next.svg"}
                                alt="Avatar"
                            />
                            <h3
                                className="text-xl font-semibold"
                            >
                                {u?.displayName}
                            </h3>
                        </div>
                    ))
                }
            </div>
        </section >
    )
}
