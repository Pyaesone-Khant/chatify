"use client";

import { auth, db, provider } from "@/libs/firebase";
import { onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    user: User | null;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        return onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const { uid, displayName, photoURL } = currentUser;
                await setDoc(doc(db, 'users', uid), {
                    uid,
                    displayName,
                    photoURL,
                })
            }
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