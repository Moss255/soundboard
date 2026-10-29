// This will hold the code for the soundboard grid

import { ListResult } from 'pocketbase';
import { pb, SoundRecord } from '../library/client';
import { listUserSounds } from '../library/data';
import './soundboard-button';

class SoundboardGrid extends HTMLElement {
    sounds: ListResult<SoundRecord>;
    playSound() {

    }

    render() {
        this.innerHTML = `
            <div class='fixed-grid'>
                <div class='grid has-3-cols'>
                    ${this.sounds.items.map((sound: SoundRecord) => `<soundboard-button name='${sound.name}' data-image-url=${pb.files.getURL(sound, sound?.image as string, { thumb: "100x100"})} data-sound-url=${pb.files.getURL(sound, sound.file as string)}></soundboard-button>`).join('')}
                </div>
            </div>
        `
    }

    async connectedCallback() {
        this.sounds = await listUserSounds();
        this.render();
    }
}

window.customElements.define('soundboard-grid', SoundboardGrid);