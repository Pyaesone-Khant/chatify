"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useResponsive } from "@/hooks";
import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { UnAuthScreen } from "../UnAuthScreen";
import { UserList } from "../UserList";
import { ChatBox } from "./ChatBox";

export function ChatLayout() {

    const { user } = useAuth();
    const [opened, { toggle }] = useDisclosure(false);

    const [currentChat, setCurrentChat] = useState<{
        chatId: string,
        user: StoredUser
    } | null>(null);

    const { isMD } = useResponsive();

    return (
        <main
            className="min-h-screen bg-blue-950 flex"
        >
            {
                user?.uid ? (
                    <section
                        className="w-full flex-1 grid grid-cols-3 "
                    >
                        {
                            !isMD && (
                                <UserList
                                    onSelect={(chatId: string, user: StoredUser) => {
                                        setCurrentChat({ chatId, user });
                                    }}
                                    currentChat={currentChat!}
                                />
                            )
                        }

                        <Drawer
                            opened={opened}
                            onClose={toggle}
                            size="md"
                            classNames={{
                                header: "!bg-blue-950",
                                body: "!flex-1 flex",
                                content: "!bg-blue-950 !flex flex-col",
                            }}
                        >
                            <UserList
                                onSelect={(chatId: string, user: StoredUser) => {
                                    setCurrentChat({ chatId, user });
                                    toggle();
                                }}
                                currentChat={currentChat!}
                                isInDrawer={true}
                            />
                        </Drawer>

                        <section
                            className="col-span-2 max-md:col-span-3 flex flex-col bg-black/30 relative"
                        >
                            {
                                isMD && (
                                    <Button
                                        variant="outline"
                                        classNames={{
                                            root: "!w-fit !absolute top-4 left-4",
                                        }}
                                        onClick={toggle}
                                    >
                                        Show Users
                                    </Button>
                                )
                            }
                            {
                                currentChat?.chatId ? (
                                    <ChatBox
                                        currentChat={currentChat}
                                    />
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center">
                                        <h1 className="text-3xl font-bold text-blue-100">Select a chat</h1>
                                        <p className="text-gray-400">Click on a user to start chatting</p>
                                    </div>
                                )
                            }
                        </section>
                    </section>
                ) : (
                    <UnAuthScreen />
                )
            }
        </main>
    )
}
