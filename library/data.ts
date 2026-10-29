import { pb, SharedRecord, SoundRecord, UserRecord } from './client';

export async function listUserSounds() {
    return pb.collection('sounds').getList();
}

export async function uploadNewSound(sound: SoundRecord) {
    const record = await pb.collection('sounds').create<SoundRecord>(sound);
    return record;
}

export async function reorderSounds() {

}

export async function shareSound(sound: SoundRecord, users: UserRecord[], expiry: Date) {
    // Allows sharing a sound with other user
    const record = await pb.collection('shared').create<SharedRecord>({
        sound: sound,
        users: users,
        expiry: expiry,
    });
    return record;
}