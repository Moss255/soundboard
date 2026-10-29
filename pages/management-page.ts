import { listUserSounds, uploadNewSound } from "../library/data";

// This will hold the management page
// The user will be able to manage what sounds they have and what they do with them, replace, delete etc
class ManagementPage extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    async render() {
        const sounds = await listUserSounds();
        this.innerHTML = `
            <h1>Management</h1>
            ${sounds.items.map((sound) => `<div>${sound.name}</div>`).join('')}
        `
    }
}

window.customElements.define('management-page', ManagementPage);