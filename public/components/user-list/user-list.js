angular.module( 'controllers' )
.controller( 'UserListCtrl', ['$scope', '$http',
    function($scope, $http ) {

        $http.get( '/api/users' ).then( function(res) {
          $scope.users = res.data;
        });

}]);
