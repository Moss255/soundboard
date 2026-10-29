import { logout, onAuthChange } from '../library/auth';

class MenuBar extends HTMLElement {

    render() {
        // Will only render if the user is logged in
        this.innerHTML = `
   <nav class="navbar is-fixed-bottom bottom-menu" aria-label="Main">
    <div class="navbar-brand">
      <a class="navbar-item" href="/" aria-label="Home">
        <span class="icon is-medium"><i class="fas fa-lg fa-house"></i></span>
      </a>
      <a class="navbar-item" href="/upload" aria-label="Upload">
        <span class="icon is-medium"><i class="fas fa-lg fa-upload"></i></span>
      </a>
      <a class="navbar-item" href="/share" aria-label="Share">
        <span class="icon is-medium"><i class="fas fa-lg fa-share"></i></span>
      </a>
      <button id='logout-button' class="navbar-item" aria-label="Settings">
        <span class="icon is-medium"><i class="fas fa-lg fa-sign-out"></i></span>
      </a>
    </div>
  </nav>
        `;

    }
    connectedCallback() {
        onAuthChange((user) => user ? this.render() : null);
        document.querySelector('#logout-button')?.addEventListener('click', () => logout());
    }
}

window.customElements.define('menu-bar', MenuBar);