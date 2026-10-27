class MenuBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div>
                <a href='/home'>Home</a>
                <a href='/upload'>Upload</a>
                <a href='/share'>Share</a>
            </div>
        `
    }
}

window.customElements.define('x-menu-bar', MenuBar);