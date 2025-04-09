"use client";

import { useAuth } from "@/contexts/AuthContext";
import { db, rtdb } from "@/libs/firebase";
import { cn } from "@/services/cn";
import { onValue, ref } from "firebase/database";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Chatify } from "./common";
import { LogoutModal } from "./LogoutModal";
import { User } from "./User/User";

type UserListProps = {
    onSelect: (chatId: string, user: StoredUser) => void;
    currentChat: {
        chatId: string,
        user: StoredUser
    },
    isInDrawer?: boolean
}

export function UserList({
    onSelect,
    currentChat,
    isInDrawer = false
}: UserListProps) {

    const { user } = useAuth();
    const [users, setUsers] = useState<StoredUser[]>([]);

    useEffect(() => {

        if (!user?.uid) return;

        const unsubscribe = onSnapshot(collection(db, 'users'), (snap) => {
            const allUsers = snap.docs
                .map(doc => doc.data())
                .filter(u => u.uid !== user?.uid);

            setUsers(allUsers as StoredUser[]);

            allUsers.forEach((u) => {
                const presenceRef = ref(rtdb, `presence/${u.uid}`);
                onValue(presenceRef, (snapshot) => {
                    const isOnline = snapshot.val()?.online ?? false;
                    setUsers(prev =>
                        prev.map(existing =>
                            existing.uid === u.uid ? { ...existing, isOnline } : existing
                        )
                    );
                })
            })

        });

        return () => {
            unsubscribe();
        }
    }, [user]);

    const onlineUsers = users.filter(u => u.isOnline);
    const offlineUsers = users.filter(u => !u.isOnline);

    return (
        <section
            className={cn("flex flex-col border-r border-white/30", {
                "flex-1 border-r-0": isInDrawer,
            })}
        >
            <article
                className="flex items-center justify-between gap-4 p-6 border-b border-white/20 "
            >
                <Chatify
                    size="md"
                />
                <LogoutModal />
            </article>



            <div className="flex-1 overflow-y-scroll w-full flex flex-col gap-6 p-6 ">
                {
                    onlineUsers.length > 0 && (
                        <Users
                            users={onlineUsers}
                            currentChat={currentChat}
                            onSelect={onSelect}
                            title="Online"
                        />
                    )
                }
                {
                    offlineUsers.length > 0 && (
                        <Users
                            users={offlineUsers}
                            currentChat={currentChat}
                            onSelect={onSelect}
                            title="Offline"
                        />
                    )
                }

            </div>
        </section >
    )
}


const Users = ({
    users,
    currentChat,
    onSelect,
    title
}: {
    users: StoredUser[],
    currentChat: {
        chatId: string,
        user: StoredUser
    },
    onSelect: (chatId: string, user: StoredUser) => void,
    title: "Online" | "Offline"
}) => {
    return (
        <section
            className="space-y-4"
        >
            <h2
                className={cn("text-lg font-bold ", {
                    "text-gray-400": title === "Offline",
                    "text-green-400": title === "Online"
                })}
            >
                {title} Users
            </h2>
            <div className="w-full flex flex-col gap-4">
                {
                    users.map((u) => (
                        <User
                            key={u.uid}
                            receiver={u}
                            isActive={currentChat?.user.uid === u.uid}
                            onSelect={onSelect}
                        />
                    ))
                }
            </div>
        </section>
    )
}