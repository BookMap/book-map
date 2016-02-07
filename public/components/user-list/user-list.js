
angular.module( 'controllers' )
.controller( 'UserListCtrl', [ '$rootScope','$scope', '$http',
    function($rootScope, $scope, $http ) {

        $http.get( '/api/users' ).then( function( res ) {
          $scope.users = res.data;
        });

}]);
