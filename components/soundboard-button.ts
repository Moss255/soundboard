// This will hold the code for the soundboard grid
export interface SfxPlayDetail {
    url: string;
}

class SoundboardButton extends HTMLElement {

    static get observedAttributes() {
        return ['name'];
    }

    connectedCallback() {
        this.render();
            document.querySelector('button')?.addEventListener('click', () => {
                document.querySelector('soundboard-page')?.dispatchEvent(new CustomEvent('sfx-play', {
                    detail: { url: this.getAttribute('data-sound-url') },
                    bubbles: true,
                }));
        });
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <button class='button'>
                <div>
                    <img src="${this.getAttribute('data-image-url')}" />
                    <span>${this.getAttribute('name') ?? 'NA'}</span>
                </div>
            </button>
        `;
    }
}

window.customElements.define('soundboard-button', SoundboardButton);

declare global {
    interface HTMLElementEventMap {
        'sfx-play': CustomEvent<SfxPlayDetail>;
    }
    interface HTMLElementTagNameMap {
        'soundboard-button': SoundboardButton;
    }
}