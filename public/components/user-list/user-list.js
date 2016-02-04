
angular.module( 'controllers' ).controller( 'UserListCtrl', [ '$scope', '$http', '$window',
    function( $scope, $http, $window ) {
        $http.get( '/api/users' ).then( function( res ) {
          $scope.users = res.data;
         });
        $scope.getUser = function (user){
          $window.localStorage.temp = JSON.stringify({id: user._id, name: user.username, about: user.about});
        }
    }]
);
