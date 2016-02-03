var token = window.localStorage.token;

if ( !token ) {
    redirectToLogin();
}

function redirectToLogin() {
    window.location.assign( '/' );
}
