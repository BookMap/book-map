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
          controller: 'UserListCtrl'
      })

      .when('/publicProfile', {
          templateUrl: 'components/public-profile/public-profile.html',
          controller: 'PublicProfileCtrl'
      })

      .when('/profile', {
        templateUrl: 'components/profile/profile.html',
        controller: 'ProfileCtrl'
      })

<<<<<<< HEAD
      .when('/home', {
=======
      .when('/details/:book_id', {
        templateUrl: 'components/book-detail/book-detail.html',
        controller: 'BookDetailCtrl'
      })

      .when('/',{
>>>>>>> 928e4d1f04c3f7e4edc15b43dd1b02f7c725ecb5
          templateUrl: 'components/home/home.html',
          controller: 'HomeCtrl'
      })

      .otherwise({
          redirectTo: '/'
      });


}]);
