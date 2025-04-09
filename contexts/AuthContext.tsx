"use client";

import { auth, db, provider, rtdb } from "@/libs/firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { onDisconnect, onValue, ref, set } from "firebase/database";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    user: StoredUser | null;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const [user, setUser] = useState<StoredUser | null>(null);

    useEffect(() => {
        return onAuthStateChanged(auth, async (currentUser) => {
            setUser({ ...currentUser, isOnline: true } as StoredUser);
            if (currentUser) {
                const { uid, displayName, photoURL } = currentUser;
                await setDoc(doc(db, 'users', uid), {
                    uid,
                    displayName,
                    photoURL,
                })
            }

            // for realtime👇
            const userStatusRef = ref(rtdb, `presence/${currentUser?.uid}`);
            const connectedRef = ref(rtdb, '.info/connected');

            onValue(connectedRef, (snap) => {
                if (snap.val() === false) return;

                onDisconnect(userStatusRef).set({ online: false });
                set(userStatusRef, { online: true });
            });

        });
    }, []);

    const login = async () => {
        await signInWithPopup(auth, provider)
    };

    const logout = async () => {
        await signOut(auth)
    };

    return (
        <AuthContext.Provider
            value={{ user, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext) as AuthContextType;