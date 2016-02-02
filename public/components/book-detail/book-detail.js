var ctrl = 'BookDetailCtrl';

angular.module( 'controllers' )
    .controller( ctrl, [ '$scope', '$routeParams', '$http',

        function( $scope, $routeParams, $http ) {
            $http.get( '/api/book/' + $routeParams.bookId ).then( function( res ) {
                $scope.book = res.data;
            });
        }]
    )

    .config( [ '$routeProvider', function( $routeProvider ) {
        $routeProvider
            .when('/book/:bookId', {
                templateUrl: 'components/book-detail/book-detail.html',
                controller: ctrl
            });


    }]);