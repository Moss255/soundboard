// data/client.ts
import PocketBase, { type RecordModel, type RecordService } from 'pocketbase';

export interface SoundRecord extends RecordModel {
    name: string;
    file: File;
    image: File;
    user: UserRecord;
    order: number;
}

export interface SharedRecord extends RecordModel {
    sound: SoundRecord;
    users: UserRecord[];
    expiry: Date;
}

export interface UserRecord extends RecordModel {
    email: string;
    name: string;
}

interface TypedPocketBase extends PocketBase {
    collection(idOrName: string): RecordService;
    collection(idOrName: 'sounds'): RecordService<SoundRecord>;
    collection(idOrName: 'users'): RecordService<UserRecord>;
    collection(idOrName: 'shared'): RecordService<SharedRecord>;
}

export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL) as TypedPocketBase;