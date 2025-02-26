// Purpose: This file is responsible for initializing the Auth0 client and setting up the login button to redirect to the Auth0 login page.
import createAuth0Client from '@auth0/auth0-spa-js';

let auth0 = null;

async function initAuth0() {
    try {
        auth0 = await createAuth0Client({
            domain: 'dev-hsmyim6kzl743yz0.us.auth0.com',
            client_id: 'OqlB3cKWSsKpLWb8sHMWdOgI9JSWEcIe',
            redirect_uri: window.location.origin
        });
    } catch (error) {
        console.error('Failed to initialize Auth0:', error);
    }
}

async function setup() {
    const loginBtn = document.getElementById('login');
    loginBtn.disabled = true;

    await initAuth0();

    if (auth0) {
        loginBtn.disabled = false;
        loginBtn.addEventListener('click', async () => {
            await auth0.loginWithRedirect();
        });
    } else {
        console.error('Auth0 initialization failed');
    }
}

setup();