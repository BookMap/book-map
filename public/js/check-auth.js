var token = window.sessionStorage.token || window.localStorage.token;

if ( !token ) {
    redirectToLogin();
}

function redirectToLogin() {
    window.location.assign( 'login.html' );
}