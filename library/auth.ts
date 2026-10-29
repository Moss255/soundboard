import { pb, UserRecord } from './client';

export interface User {
    id: string;
    email: string;
    name: string;
}

export async function login(email: string, password: string) {
    await pb.collection('users').authWithPassword(email, password);
}

function toUser(record: UserRecord | null): User | null {
    return record ? { id: record.id, email: record.email, name: record.name } as UserRecord : null
}

export function currentUser() {
    return pb.authStore.isValid ? toUser(pb.authStore.record as UserRecord | null) : null;
}

export async function logout() {
    pb.authStore.clear();
    navigation.navigate('/login');
}

export function onAuthChange(callback: (user: User | null) => void): () => void {
    return pb.authStore.onChange(() => callback(currentUser()), true);
}