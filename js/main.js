(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeToggle('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
})(jQuery);

// Auth0 Initialization
async function initAuth0() {
    if (window.auth0) {
        try {
            const auth0Client = await window.auth0.createAuth0Client({
                domain: 'dev-hsmyim6kzl743yz0.us.auth0.com',
                client_id: 'lo8WJdsOHtE8Urz1dzunYIk17irwqD8m',
                redirectUri: window.location.origin,
                audience: 'https://dev-hsmyim6kzl743yz0.us.auth0.com/api/v2/'
            });

            let isAuthenticated = false;
            try {
                await auth0Client.getTokenSilently();
                isAuthenticated = true;
            } catch (error) {
                if (error.errorCode === 'login_required') {
                    isAuthenticated = false;
                } else {
                    console.error('Error checking authentication:', error);
                }
            }

            if (isAuthenticated) {
                const user = await auth0Client.getUser();
                console.log('User:', user);
                document.getElementById('user-info').textContent = `Logged in as ${user.name}`;
                document.getElementById('login').style.display = 'none';
                document.getElementById('logout').style.display = 'inline';
            } else {
                console.log('User is not logged in');
                document.getElementById('user-info').textContent = 'Not logged in';
                document.getElementById('login').style.display = 'inline';
                document.getElementById('logout').style.display = 'none';
            }

            // Set up login button
            document.getElementById('login').addEventListener('click', async () => {
                await auth0Client.loginWithRedirect();
            });

            // Set up logout button
            document.getElementById('logout').addEventListener('click', async () => {
                await auth0Client.logout({
                    returnTo: window.location.origin
                });
            });

            // Handle redirect callback after login
            if (window.location.search.includes('code=')) {
                await auth0Client.handleRedirectCallback();
                window.location.href = '/'; // Redirect to home page
            }
        } catch (error) {
            console.error('Error initializing Auth0:', error);
        }
    } else {
        console.error('Auth0 is not defined');
    }
}

// Call initAuth0 when the page loads
window.addEventListener('load', initAuth0);