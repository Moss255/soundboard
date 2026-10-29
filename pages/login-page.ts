import { login, onAuthChange } from '../library/auth';

class LoginComponent extends HTMLElement {
    private unsubscribe: any;

    async login(e: Event) {
        e.preventDefault();
        const loginForm: HTMLFormElement = document.querySelector('#login-form') as HTMLFormElement;
        const form = new FormData(loginForm);
        const username = form.get('username') as string;
        const password = form.get('password') as string;
        try {
            await login(username, password);
            navigation.navigate('/');
        } catch (error) {
            console.error(error);
        }
        
    }

    connectedCallback() {
        this.innerHTML = `
            <section class='section'>
                <div class='container'>
                    <h1 class='title is-1'>Soundboard</h1>
                    <form id='login-form' method='post'>
                        <div class='field'>
                            <label class='label'>Username</label>
                            <div class='control'>
                                <input class='input' name='username'/>
                            </div>
                        </div>
                        <div class='field'>
                            <label class='label'>Password</label>
                            <div class='control'>
                                <input class='input' name='password' type='password'/>
                            </div>
                        </div>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </section>

        `;

        document.querySelector('#login-form')?.addEventListener('submit', this.login);
    }
}

window.customElements.define('login-page', LoginComponent);
