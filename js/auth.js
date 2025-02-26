let auth0 = null;

const initAuth = async () => {
    console.log('window.createAuth0Client:', window.createAuth0Client);
    if (typeof window.createAuth0Client !== 'function') {
        console.error('Error: createAuth0Client is not a function. Check if Auth0 script loaded.');
        return;
    }
    auth0 = await window.createAuth0Client({
        domain: "dev-hsmyim6kzl743yz0.us.auth0.com",
        client_id: "OqlB3cKWSsKpLWb8sHMWdOgI9JSWEcIe",
        redirectUri: window.location.origin
    });
    updateUI();
};

const updateUI = async () => {
    const user = await auth0.getUser();
    const isAuthenticated = user != null;
    document.getElementById("login").style.display = isAuthenticated ? "none" : "block";
    document.getElementById("logout").style.display = isAuthenticated ? "block" : "none";
    if (isAuthenticated) {
        document.getElementById("user-info").innerText = `Logged in as: ${user.name}`;
    }
};

document.getElementById("login").addEventListener("click", async () => {
    await auth0.loginWithRedirect();
});

document.getElementById("logout").addEventListener("click", async () => {
    await auth0.logout({ returnTo: window.location.origin });
});


window.addEventListener('load', function() {
    if (typeof window.createAuth0Client === 'function') {
      // Your Auth0 initialization code
      createAuth0Client({
        domain: 'dev-hsmyim6kzl743yz0.us.auth0.com',
        clientId: 'OqlB3cKWSsKpLWb8sHMWdOgI9JSWEcIe'
      }).then(auth0 => {
        console.log('Auth0 initialized:', auth0);
      }).catch(error => {
        console.error('Auth0 initialization failed:', error);
      });
    } else {
      console.error('Auth0 script not loaded');
    }
  });