import { currentUser } from "../library/auth";
import { SfxPlayDetail } from '../components/soundboard-button';
import '../components/soundboard-grid';

class SoundboardPage extends HTMLElement {

    play(url: string) {
        const audio = new Audio(url);
        console.log(`Playing audio: ${url}`);
        audio.play();
    }

    connectedCallback() {
        this.render();
        this.addEventListener('sfx-play', (e) => this.play(e.detail.url));
    }

    render() {
        this.innerHTML = `
            <section class='section'>
                <div class='container'>
                    <span> Welcome ${currentUser()?.name} </span>
                    <soundboard-grid></soundboard-grid>
                </div>
            </section>
        `;
    }
}

window.customElements.define('soundboard-page', SoundboardPage);