var app = angular.module( 'myApp', [
    'ngRoute',
    'controllers',
 ]);

var controllers = angular.module( 'controllers', [] );


app.config( [ '$routeProvider', '$httpProvider', function( $routeProvider, $httpProvider ) {

  $httpProvider.interceptors.push( 'authInterceptor' );


  $routeProvider
      .when('/books', {
          templateUrl: 'components/book-list/book-list.html',
          controller: 'BookListCtrl'
      })


      .when('/users', {
          templateUrl: 'components/user-list/user-list.html',
          controller: 'UserCtrl'
      })

      .when('/profile', {
        templateUrl: 'components/profile/profile.html',
        controller: 'ProfileCtrl'
      })

      .when('/',{
          templateUrl: 'components/home/home.html',
          controller: 'HomeCtrl'
      })

      .otherwise({
          redirectTo: '/'
      });


}]);
