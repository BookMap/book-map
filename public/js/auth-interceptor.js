angular.module( 'myApp' ).factory( 'authInterceptor', function ( $window, $q ) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
	    var token = $window.localStorage.token;
      if ( token ) {
        config.headers.token = token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
      	redirectToLogin();
      }
      return response || $q.when(response);
    }
  };
});
