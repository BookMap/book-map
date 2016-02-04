angular.module( 'controllers' ).controller( 'UserListCtrl', [ '$scope', '$http',
    function( $scope, $http ) {
        $http.get( '' ).then( function( res ) {
            $scope.books = res.data;
        });
    }]
);