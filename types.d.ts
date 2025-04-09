interface Message {
    id: string;
    text: string;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    };
    uid: string;
    photoURL: string;
}

interface StoredUser {
    uid: string;
    displayName: string;
    photoURL?: string;
    isOnline?: boolean;
}