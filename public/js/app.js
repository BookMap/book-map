var app = angular.module( 'myApp', [
    'ngRoute',
    'controllers'
]);

var controllers = angular.module( 'controllers', [] );

app.config( [ '$routeProvider', function( $routeProvider ) {

    $routeProvider
        .when('/books', {
            templateUrl: 'components/book-list/book-list.html',
            controller: 'BookListCtrl'
        })

        .when('/users', {
            templateUrl: 'components/user-list/user-list.html',
            controller: 'UserCtrl'
        })

        .otherwise({
            redirectTo: '/'
        });

}]);