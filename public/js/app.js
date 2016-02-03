var app = angular.module( 'myApp', [
    'ngRoute',
    'controllers',
 ]);

var controllers = angular.module( 'controllers', [] );

app.controller('GreetingController', ['$scope', function($scope) {
    $scope.greeting = 'Hola!';
}]);


$scope.greeting = 'Hola!';

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

        .when('/book/:bookId', {
            templateUrl: 'components/book-detail/book-detail.html',
            controller: 'BookDetailCtrl'
        })

        .otherwise({
            redirectTo: '/'
        });

}]);