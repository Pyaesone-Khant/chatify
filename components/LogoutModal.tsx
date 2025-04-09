"use client";

import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/services/cn";
import { useState } from "react";
import { Button } from "./common/Button";

export function LogoutModal() {

    const { logout } = useAuth();
    const [opened, setOpened] = useState<boolean>(false);

    return (
        <>
            <Button
                onClick={() => setOpened(true)}
                variant="danger"
            >
                Logout
            </Button>

            <div
                className={cn("fixed inset-0 flex items-center justify-center bg-black/30 scale-0 transition duration-300 opacity-0 z-[100] ", {
                    "scale-100 opacity-100 ": opened,
                })}
                onClick={() => setOpened(false)}
            >
                <div
                    className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full space-y-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <article
                        className="space-y-1"
                    >
                        <h2 className="text-xl font-bold text-red-500">Logout</h2>
                        <p className="text-gray-500">Are you sure you want to logout?</p>
                    </article>
                    <div className="flex justify-end gap-2">
                        <Button
                            onClick={() => setOpened(false)}
                            variant="secondary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                logout();
                                setOpened(false);
                            }}
                            variant="danger"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
