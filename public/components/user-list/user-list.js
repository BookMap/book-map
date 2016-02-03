angular.module( 'controllers' ).controller( 'UserListCtrl', [ '$scope', '$http',
    function( $scope, $http ) {
        $http.get( '/api/search?search=users' ).then( function( res ) {
          $scope.users = res.data;
        });
    }]
);
