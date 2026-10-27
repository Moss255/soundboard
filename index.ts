import Pocketbase from 'pocketbase';
import './components/menu-bar';

const pb = new Pocketbase('https://pocketbase-axaftburmc4vaywbmaeh8tm7.moss255.xyz');

// Main page

class LoginComponent extends HTMLElement {
    login(e) {
        e.preventDefault();
        console.log(e);
        const form = new FormData(document.querySelector('#login-form'));
        console.log(form.get('username'));
        const username = form.get('username') as string;
        const password = form.get('password') as string;
        new Promise(async (resolve, reject) => {
            const authData = await pb.collection('users').authWithPassword(username, password);

            console.log(authData);
            resolve(authData);
        })
    }


    connectedCallback() {
        this.innerHTML = `
            <form id='login-form' method='post'>
                <input name='username'/>
                <input name='password'/>
                <button type='submit'>Submit</button>
            </form>
        `;

        document.querySelector('#login-form')?.addEventListener('submit', this.login);
    }
}

window.customElements.define('x-login-page', LoginComponent);

class MainPageComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <x-login-page/>
        `
    }
}

window.customElements.define('x-main-page', MainPageComponent)