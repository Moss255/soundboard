// This will hold the code for the sharing page.
import { shareSound } from "../library/data";

class SharePage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        Sharing in caring`
    }
}

window.customElements.define('share-page', SharePage);