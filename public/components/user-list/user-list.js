angular.module( 'controllers' ).controller( 'UserListCtrl', [ '$scope', '$http',
    function( $scope, $http ) {
        $http.get( '/api/books' ).then( function( res ) {
            $scope.books = res.data;
        });
    }]
);
