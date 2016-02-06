
angular.module( 'controllers' ).controller( 'UserListCtrl', [ '$rootScope','$scope', '$http', '$window',
    function($rootScope, $scope, $http, $window ) {
        $http.get( '/api/users' ).then( function( res ) {

            console.log(res.data, ' is users');
          $scope.users = res.data;
         });



        //$scope.getUser = function (user){
        //  $window.localStorage.temp = JSON.stringify({id: user._id, name: user.username, about: user.about});
        //}


        //$scope.getUser = function (userid) {
        //
        //    $rootScope.profileToView = userid;
        //
        //    console.log( $rootScope.profileToView, " is magic id");
        //
        //    $window.location.assign('/#/public-profile.html');
        //};



    }]
);
