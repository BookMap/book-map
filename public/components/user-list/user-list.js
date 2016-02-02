angular.module( 'controllers' ).controller( 'BookListCtrl', [ '$scope', '$http',
    function( $scope, $http ) {
        $http.get( '/api/books' ).then( function( res ) {
            $scope.books = res.data;
        });
    }]
);